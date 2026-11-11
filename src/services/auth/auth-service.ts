import { OnboardingError } from "@/helpers/customErrorClasses/onboarding-error";
import { SignInError } from "@/helpers/customErrorClasses/sign-in-error";
import { SignUpError } from "@/helpers/customErrorClasses/signup-error";
import { mapAuthError, mapSignUpError } from "@/helpers/mappers/map-auth-error";
import { mapVetDetails } from "@/helpers/mappers/map-vet-details";
import { supabase } from "@/lib";
import {
  ProfileStepOutput,
  VetStepOutput,
} from "@/lib/zod-schemas/onboardingSchema";

import {
  IProfile,
  IVetDetailsRaw,
  IRanchDetails,
  UserRole,
  IAppleSignInParams,
  IVetDetails,
} from "@/types/auth-types";
import {
  ONBOARDING_ERROR_MESSAGES,
  SIGN_UP_ERROR_MESSAGES,
  SIGNIN_ERROR_MESSAGES,
} from "@/utils/consts";

import {
  ADMIN_MOCK_RANCH_DETAILS,
  ADMIN_MOCK_VET_DETAILS,
} from "@/utils/mocks";

import { GoogleSignin } from "@react-native-google-signin/google-signin";

export interface IFullUserData {
  profile: IProfile | null;
  vetDetails: IVetDetails | null;
  ranchDetails: IRanchDetails | null;
}

type RoleDetailsResult = Partial<
  Pick<IFullUserData, "vetDetails" | "ranchDetails">
>;

const profilesLookup: Record<
  UserRole,
  (userId: string) => Promise<RoleDetailsResult>
> = {
  vet: async (userId) => {
    const { data, error } = await supabase
      .from("vet_details")
      .select("*, vet_specialties(specialty_code)")
      .eq("profile_id", userId)
      .maybeSingle<IVetDetailsRaw>();

    if (error) throw error;

    return { vetDetails: data ? mapVetDetails(data) : null };
  },
  ranch_owner: async (userId) => {
    const { data, error } = await supabase
      .from("ranch_details")
      .select("*")
      .eq("profile_id", userId)
      .maybeSingle<IRanchDetails>();

    if (error) throw error;

    return { ranchDetails: data };
  },
  admin: async (userId) => ({
    vetDetails: { ...ADMIN_MOCK_VET_DETAILS, profile_id: userId },
    ranchDetails: { ...ADMIN_MOCK_RANCH_DETAILS, profile_id: userId },
  }),
};

export const AuthService = {
  async getFullUserData(userId: string): Promise<IFullUserData> {
    try {
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();
      if (sessionError || !sessionData.session) {
        throw new Error("No active or valid auth session");
      }
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single<IProfile>();

      if (profileError) {
        console.error("Error fetching profile: ", profileError);
        throw profileError;
      }

      const fetchRoleDetails = profile.role
        ? profilesLookup[profile.role]
        : undefined;
      const roleDetails = fetchRoleDetails
        ? await fetchRoleDetails(userId)
        : {};

      return {
        profile: profile,
        vetDetails: null,
        ranchDetails: null,
        ...roleDetails,
      };
    } catch (error) {
      console.error("Error in getFullUserData: ", error);
      throw error;
    }
  },

  async completeOnboarding(profile: ProfileStepOutput, vet?: VetStepOutput) {
    const { error } = await supabase.rpc("complete_onboarding", {
      p_role: profile.role,
      p_phone_number: profile.phone_number,
      p_specialties: vet?.specialties,
      p_license_number: vet?.license_number,
    });

    if (error) {
      throw new OnboardingError(
        error.message,
        ONBOARDING_ERROR_MESSAGES[error.message] ??
          "Unable to complete onboarding process.",
      );
    }
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    try {
      const currentUser = GoogleSignin.getCurrentUser();

      if (currentUser) {
        await GoogleSignin.signOut();
      }
    } catch (googleError) {
      console.error("Google sign out failed: ", googleError);
    }
    if (error) throw error;
  },

  async signInWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      const kind = mapAuthError(error);
      throw new SignInError(kind, SIGNIN_ERROR_MESSAGES[kind]);
    }

    return data;
  },

  async signInWithApple({
    identityToken,
    authorizationCode,
    nonce,
  }: IAppleSignInParams) {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: "apple",
      token: identityToken,
      nonce,
      access_token: authorizationCode,
    });

    if (error) {
      throw error;
    }

    return data;
  },

  async signInWithGoogle() {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();

    if (!response.data?.idToken) {
      throw new Error("No Id token returned from Google");
    }

    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: "google",
      token: response.data.idToken,
    });

    if (error) throw error;

    return data;
  },

  async signUp(email: string, password: string, fullName: string) {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: { data: { full_name: fullName } },
    });

    if (error) {
      const kind = mapSignUpError(error);
      throw new SignUpError(kind, SIGN_UP_ERROR_MESSAGES[kind]);
    }

    if (data.user && data.user.identities?.length === 0) {
      throw new SignUpError(
        "user_already_exists",
        SIGN_UP_ERROR_MESSAGES.user_already_exists,
      );
    }

    return data;
  },

  async setAuthSession(accessToken: string, refreshToken: string) {
    if (!accessToken || !refreshToken) {
      throw new Error("Unable to process tokens");
    }
    const { error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    if (error) throw error;
  },
};
