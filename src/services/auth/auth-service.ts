import { supabase } from "@/lib";
import { expo } from "../../../app.json";
import * as WebBrowser from "expo-web-browser";
import {
  IProfile,
  IVetDetails,
  IRanchDetails,
  UserRole,
  IAppleSignInParams,
} from "@/types/auth-types";

import {
  ADMIN_MOCK_RANCH_DETAILS,
  ADMIN_MOCK_VET_DETAILS,
} from "@/utils/mocks";

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
    const { data } = await supabase
      .from("vet_details")
      .select("*")
      .eq("profile_id", userId)
      .maybeSingle();

    return { vetDetails: data as IVetDetails };
  },
  ranch_owner: async (userId) => {
    const { data } = await supabase
      .from("ranch_details")
      .select("*")
      .eq("profile_id", userId)
      .maybeSingle();

    return { ranchDetails: data as IRanchDetails };
  },
  admin: async (userId) => ({
    vetDetails: { ...ADMIN_MOCK_VET_DETAILS, profile_id: userId },
    ranchDetails: { ...ADMIN_MOCK_RANCH_DETAILS, profile_id: userId },
  }),
};

const onboardingsLookup: Record<
  string,
  (
    userId: string,
    details: Partial<IVetDetails> | Partial<IRanchDetails>,
  ) => Promise<void>
> = {
  vet: async (userId, details) => {
    const { error } = await supabase
      .from("vet_details")
      .insert({ profile_id: userId, ...details });

    if (error) throw error;
  },
  ranch_owner: async (userId, details) => {
    const { error } = await supabase
      .from("ranch_details")
      .insert({ profile_id: userId, ...details });

    if (error) throw error;
  },
};

export const AuthService = {
  async getFullUserData(userId: string): Promise<IFullUserData> {
    try {
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (profileError || !profile) {
        console.error("Error fetching profile: ", profileError);
        return { profile: null, vetDetails: null, ranchDetails: null };
      }
      const typedProfile = profile as IProfile;

      const fetchedResults = profilesLookup[typedProfile.role];
      const roleDetails = fetchedResults ? await fetchedResults(userId) : {};

      return {
        profile: typedProfile,
        vetDetails: null,
        ranchDetails: null,
        ...roleDetails,
      };
    } catch (error) {
      console.error("Error in getFullUserData: ", error);
      return { profile: null, vetDetails: null, ranchDetails: null };
    }
  },

  async completeOnboarding(
    userId: string,
    role: UserRole,
    details: Partial<IVetDetails | IRanchDetails>,
  ) {
    const { error: profileError } = await supabase
      .from("profiles")
      .update({ role, is_onboarded: true })
      .eq("id", userId);

    if (profileError) throw profileError;

    onboardingsLookup[role]
      ? await onboardingsLookup[role](userId, details)
      : null;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
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
    const redirectUrl = `${expo.scheme}://google-auth`;
    const response = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectUrl,
        queryParams: { prompt: "consent" },
        skipBrowserRedirect: true,
      },
    });

    const googleOAuthUrl = response.data.url;

    if (!googleOAuthUrl) {
      throw new Error("No Auth URL found");
    }

    const result = await WebBrowser.openAuthSessionAsync(
      googleOAuthUrl,
      redirectUrl,
      { showInRecents: true },
    ).catch((err) => {
      throw err;
    });

    return result;
  },

  async setAuthSession(accessToken: string, refreshToken: string) {
    if (!accessToken && !refreshToken) {
      throw new Error("Unable to process tokens");
    }
    await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  },
};
