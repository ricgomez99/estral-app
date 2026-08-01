import { create, StoreApi } from "zustand";
import { supabase } from "@/lib";
import { IAuthState } from "@/types/auth-types";
import { AuthService } from "@/services";
import { Session } from "@supabase/supabase-js";

type SetType = StoreApi<IAuthState>["setState"];

export const useAuthStore = create<IAuthState>((set, get) => ({
  session: null,
  user: null,
  profile: null,
  vetDetails: null,
  ranchDetails: null,
  role: null,
  isLoading: true,

  initialize: async () => {
    try {
      supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === "TOKEN_REFRESHED" && get().session) {
          set({ session });
          return;
        }

        if (session) {
          const userId = session.user.id;
          await syncUserData(userId, session, set);
        } else {
          clearStore(set);
        }
      });
    } catch (error) {
      console.error("Error to initialice AuthStore: ", error);
      set({ isLoading: false });
    }
  },

  refreshProfile: async () => {
    const { user, session } = get();
    if (user && session) {
      await syncUserData(user.id, session, set);
    }
  },

  signOut: async () => {
    set({ isLoading: true });
    try {
      await AuthService.signOut();
    } finally {
      clearStore(set);
    }
  },
}));

const syncUserData = async (userId: string, session: Session, set: SetType) => {
  const { profile, vetDetails, ranchDetails } =
    await AuthService.getFullUserData(userId);

  set({
    session,
    user: session.user,
    profile,
    role: profile?.role ?? null,
    vetDetails,
    ranchDetails,
    isLoading: false,
  });
};

const clearStore = (set: SetType) => {
  set({
    session: null,
    user: null,
    profile: null,
    vetDetails: null,
    ranchDetails: null,
    role: null,
    isLoading: false,
  });
};
