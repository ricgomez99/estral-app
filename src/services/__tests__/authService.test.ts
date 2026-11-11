import { AuthApiError, AuthRetryableFetchError } from "@supabase/supabase-js";
import { supabase } from "@/lib";
import { AuthService } from "../auth/auth-service";
import { SignUpError } from "@/helpers/customErrorClasses/signup-error";
import { SIGN_UP_ERROR_MESSAGES } from "@/utils/consts";

jest.mock("@/lib", () => ({
  supabase: { auth: { signUp: jest.fn() } },
}));
jest.mock("@react-native-google-signin/google-signin", () => ({
  GoogleSignin: {},
}));

const signUpMock = supabase.auth.signUp as jest.Mock;

const args = ["juan@example.com", "Abc123!x", "Juan Pérez"] as const;

const fakeUser = (identities: unknown[] | undefined = [{ id: "i1" }]) => ({
  id: "u1",
  aud: "authenticated",
  identities,
});

beforeEach(() => jest.clearAllMocks());

describe("AuthService.signUp", () => {
  describe("request", () => {
    it("sends email, password and ONLY full_name as metadata", async () => {
      signUpMock.mockResolvedValue({
        data: { user: fakeUser(), session: {} },
        error: null,
      });

      await AuthService.signUp(...args);

      expect(signUpMock).toHaveBeenCalledTimes(1);
      expect(signUpMock).toHaveBeenCalledWith({
        email: "juan@example.com",
        password: "Abc123!x",
        options: { data: { full_name: "Juan Pérez" } },
      });
    });
  });

  describe("success", () => {
    it("returns user and session when email confirmation is off", async () => {
      const data = { user: fakeUser(), session: { access_token: "t" } };
      signUpMock.mockResolvedValue({ data, error: null });

      await expect(AuthService.signUp(...args)).resolves.toBe(data);
    });

    it("returns session = null when email confirmation is on (not an error)", async () => {
      const data = { user: fakeUser(), session: null };
      signUpMock.mockResolvedValue({ data, error: null });

      const result = await AuthService.signUp(...args);

      expect(result.session).toBeNull();
      expect(result.user).not.toBeNull();
    });

    it("does not treat identities = undefined as an existing user", async () => {
      const data = { user: fakeUser(undefined), session: null };
      signUpMock.mockResolvedValue({ data, error: null });

      await expect(AuthService.signUp(...args)).resolves.toBe(data);
    });

    it("does not throw when user is null", async () => {
      const data = { user: null, session: null };
      signUpMock.mockResolvedValue({ data, error: null });

      await expect(AuthService.signUp(...args)).resolves.toBe(data);
    });
  });

  describe("already registered email (obfuscated user)", () => {
    it("throws user_already_exists when identities is empty", async () => {
      signUpMock.mockResolvedValue({
        data: { user: fakeUser([]), session: null },
        error: null,
      });

      const err = await AuthService.signUp(...args).catch((e) => e);

      expect(err).toBeInstanceOf(SignUpError);
      expect(err.kind).toBe("user_already_exists");
      expect(err.message).toBe(SIGN_UP_ERROR_MESSAGES.user_already_exists);
    });
  });

  describe("errors returned by Supabase", () => {
    it.each([
      ["user_already_exists", 422, "user_already_exists"],
      ["weak_password", 422, "weak_password"],
      ["email_address_invalid", 400, "invalid_email"],
      ["signup_disabled", 422, "signup_disabled"],
      ["over_email_send_rate_limit", 429, "rate_limited"],
      ["unexpected_failure", 500, "server_error"], // p. ej. "Database error saving new user"
      ["brand_new_code", 400, "unknown"],
    ])(
      "code %s (status %i) becomes SignUpError(%s)",
      async (code, status, kind) => {
        signUpMock.mockResolvedValue({
          data: { user: null, session: null },
          error: new AuthApiError("msg", status, code),
        });

        const err = await AuthService.signUp(...args).catch((e) => e);

        expect(err).toBeInstanceOf(SignUpError);
        expect(err.kind).toBe(kind);
        expect(err.message).toBe(
          SIGN_UP_ERROR_MESSAGES[kind as keyof typeof SIGN_UP_ERROR_MESSAGES],
        );
      },
    );

    it("maps a missing connection to network", async () => {
      signUpMock.mockResolvedValue({
        data: { user: null, session: null },
        error: new AuthRetryableFetchError("Network request failed", 0),
      });

      const err = await AuthService.signUp(...args).catch((e) => e);

      expect(err).toBeInstanceOf(SignUpError);
      expect(err.kind).toBe("network");
    });

    it("never leaks the raw Supabase message to the UI", async () => {
      signUpMock.mockResolvedValue({
        data: { user: null, session: null },
        error: new AuthApiError(
          "Database error saving new user",
          500,
          "unexpected_failure",
        ),
      });

      const err = await AuthService.signUp(...args).catch((e) => e);

      expect(err.message).not.toMatch(/database/i);
    });
  });

  describe("unexpected failures", () => {
    it("propagates a rejected promise as-is (the screen maps it to unknown)", async () => {
      const boom = new TypeError("Network request failed");
      signUpMock.mockRejectedValue(boom);

      await expect(AuthService.signUp(...args)).rejects.toBe(boom);
    });
  });
});
