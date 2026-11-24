import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";

import { AuthService } from "@/services/auth/auth-service";
import SignupForm from "@/components/SignupForm";
import { SignUpError } from "@/helpers/customErrorClasses/signup-error";
import { SIGN_UP_ERROR_MESSAGES } from "@/utils/consts";

const mockReplace = jest.fn();

jest.mock("expo-router", () => {
  const React = require("react");
  const { Text } = require("react-native");

  return {
    useRouter: () => ({ replace: mockReplace }),
    router: { replace: mockReplace },
    usePathname: () => "/",

    Link: ({ children, asChild }: any) =>
      asChild ? children : React.createElement(Text, null, children),
  };
});

jest.mock("@/services/auth/auth-service", () => ({
  AuthService: { signUp: jest.fn() },
}));

const signUp = AuthService.signUp as jest.Mock;

const SUBMIT_ID = "submit-btn";

const setup = async () => {
  await render(<SignupForm />);
};

const fill = async ({
  name = "Juan Pérez",
  email = "juan@example.com",
  password = "Abc123!x",
} = {}) => {
  await fireEvent.changeText(screen.getByPlaceholderText("John Doe"), name);
  await fireEvent.changeText(
    screen.getByPlaceholderText("example@gmail.com"),
    email,
  );
  await fireEvent.changeText(
    screen.getByPlaceholderText("* * * * * * * *"),
    password,
  );
};

const press = async () => {
  await fireEvent.press(screen.getByTestId(SUBMIT_ID));
};

// ---------------------------------------------------------------------------
// Setup / teardown
// ---------------------------------------------------------------------------
let errorSpy: jest.SpyInstance;

beforeEach(() => {
  jest.clearAllMocks();
  signUp.mockReset();
  errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  errorSpy.mockRestore();
});

describe("SignUpForm submit", () => {
  describe("navigation", () => {
    it("goes to /onboarding when a session is returned", async () => {
      signUp.mockResolvedValue({
        session: { access_token: "t" },
        user: { identities: [{}] },
      });

      await setup();
      await fill();
      await press();

      await waitFor(() =>
        expect(mockReplace).toHaveBeenCalledWith("/onboarding"),
      );
      expect(mockReplace).toHaveBeenCalledTimes(1);
    });

    it("goes to /check-email (with the email) when there is no session", async () => {
      signUp.mockResolvedValue({ session: null, user: { identities: [{}] } });

      await setup();
      await fill();
      await press();

      await waitFor(() =>
        expect(mockReplace).toHaveBeenCalledWith({
          pathname: "/check-email",
          params: { email: "juan@example.com" },
        }),
      );
      expect(mockReplace).toHaveBeenCalledTimes(1);
      expect(mockReplace).not.toHaveBeenCalledWith("/onboarding");
    });
  });

  describe("input handling", () => {
    it("sends normalized values (trimmed name, lowercase trimmed email)", async () => {
      signUp.mockResolvedValue({ session: { access_token: "t" }, user: {} });

      await setup();
      await fill({ name: "  Juan Pérez ", email: "  Juan@Example.COM " });
      await press();

      await waitFor(() =>
        expect(signUp).toHaveBeenCalledWith(
          "juan@example.com",
          "Abc123!x",
          "Juan Pérez",
        ),
      );
    });

    it.each([
      ["invalid email", { email: "no-es-un-correo" }],
      ["short name", { name: "Ana" }],
      ["weak password", { password: "abc" }],
    ])(
      "does not call the service or navigate with %s",
      async (_label, override) => {
        await setup();
        await fill(override);
        await press();

        await waitFor(() => expect(errorSpy).toBeDefined());
        expect(signUp).not.toHaveBeenCalled();
        expect(mockReplace).not.toHaveBeenCalled();
      },
    );

    it("does not call the service with an empty form", async () => {
      await setup();
      await press();

      expect(signUp).not.toHaveBeenCalled();
      expect(mockReplace).not.toHaveBeenCalled();
    });
  });

  describe("error handling", () => {
    it("shows user_already_exists under the email field only (no generic error)", async () => {
      signUp.mockRejectedValue(
        new SignUpError(
          "user_already_exists",
          SIGN_UP_ERROR_MESSAGES.user_already_exists,
        ),
      );

      await setup();
      await fill();
      await press();

      const matches = await screen.findAllByText(
        SIGN_UP_ERROR_MESSAGES.user_already_exists,
      );
      expect(matches).toHaveLength(1);
      expect(screen.queryByText(SIGN_UP_ERROR_MESSAGES.unknown)).toBeNull();
      expect(mockReplace).not.toHaveBeenCalled();
    });

    it.each([
      "weak_password",
      "rate_limited",
      "network",
      "server_error",
    ] as const)(
      "shows the specific root error for %s (not the generic one)",
      async (kind) => {
        signUp.mockRejectedValue(
          new SignUpError(kind, SIGN_UP_ERROR_MESSAGES[kind]),
        );

        await setup();
        await fill();
        await press();

        expect(
          await screen.findByText(SIGN_UP_ERROR_MESSAGES[kind]),
        ).toBeTruthy();
        expect(screen.queryByText(SIGN_UP_ERROR_MESSAGES.unknown)).toBeNull();
        expect(mockReplace).not.toHaveBeenCalled();
      },
    );

    it("shows the generic message for a non-SignUpError", async () => {
      signUp.mockRejectedValue(new TypeError("Network request failed"));

      await setup();
      await fill();
      await press();

      expect(
        await screen.findByText(SIGN_UP_ERROR_MESSAGES.unknown),
      ).toBeTruthy();
      expect(mockReplace).not.toHaveBeenCalled();
    });

    it("clears the previous root error on retry", async () => {
      signUp.mockRejectedValueOnce(
        new SignUpError("network", SIGN_UP_ERROR_MESSAGES.network),
      );

      await setup();
      await fill();
      await press();
      await screen.findByText(SIGN_UP_ERROR_MESSAGES.network);

      await waitFor(() =>
        expect(screen.getByTestId(SUBMIT_ID)).not.toBeDisabled(),
      );

      signUp.mockResolvedValueOnce({
        session: { access_token: "t" },
        user: {},
      });
      await press();

      await waitFor(() =>
        expect(screen.queryByText(SIGN_UP_ERROR_MESSAGES.network)).toBeNull(),
      );
      await waitFor(() =>
        expect(mockReplace).toHaveBeenCalledWith("/onboarding"),
      );
    });

    it("lets the user retry after a failure (button is enabled again)", async () => {
      signUp.mockRejectedValue(
        new SignUpError("network", SIGN_UP_ERROR_MESSAGES.network),
      );

      await setup();
      await fill();
      await press();
      await screen.findByText(SIGN_UP_ERROR_MESSAGES.network);

      await waitFor(() =>
        expect(screen.getByTestId(SUBMIT_ID)).not.toBeDisabled(),
      );

      expect(screen.getByTestId(SUBMIT_ID)).not.toBeDisabled();
    });
  });

  describe("double submit", () => {
    it("disables the button while submitting and calls the service once", async () => {
      let resolveSignUp!: (v: unknown) => void;
      signUp.mockImplementation(
        () =>
          new Promise((resolve) => {
            resolveSignUp = resolve;
          }),
      );

      await setup();
      await fill();

      const firstPress = press();

      try {
        await waitFor(() => expect(signUp).toHaveBeenCalledTimes(1));
        await waitFor(() =>
          expect(screen.getByTestId(SUBMIT_ID)).toBeDisabled(),
        );

        const secondPress = press();
        expect(signUp).toHaveBeenCalledTimes(1);

        await act(async () => {
          resolveSignUp({ session: { access_token: "t" }, user: {} });
        });
        await Promise.all([firstPress, secondPress]);

        await waitFor(() => expect(mockReplace).toHaveBeenCalledTimes(1));
        expect(signUp).toHaveBeenCalledTimes(1);
      } finally {
        resolveSignUp?.({ session: null, user: {} });
      }
    });
  });
});
