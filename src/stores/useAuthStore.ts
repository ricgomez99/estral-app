import { create, StoreApi } from "zustand";
import { supabase } from "@/lib";
import { IAuthState } from "@/types/auth-types";
import { AuthService } from "@/services";
import { Session } from "@supabase/supabase-js";

type SetType = StoreApi<IAuthState>["setState"];
type GetType = StoreApi<IAuthState>["getState"];

let hasInitializedAuthListener = false;
let currentSyncPromise: Promise<void> | null = null;
let currentRequestId = 0;

export const useAuthStore = create<IAuthState>((set, get) => ({
  session: null,
  user: null,
  profile: null,
  vetDetails: null,
  ranchDetails: null,
  role: null,
  isLoading: true,

  initialize: async () => {
    if (hasInitializedAuthListener) return;
    hasInitializedAuthListener = true;

    const { getState, setState } = useAuthStore;

    supabase.auth.onAuthStateChange((event, session) => {
      const state = getState();

      if (!session || event === "SIGNED_OUT") {
        currentRequestId++;
        clearStore(setState);
        return;
      }

      if (event === "TOKEN_REFRESHED") {
        setState({ session, user: session.user });
        return;
      }

      if (event === "SIGNED_IN" || event === "INITIAL_SESSION") {
        if (
          state.session?.access_token === session.access_token &&
          state.profile !== null
        ) {
          setState({ isLoading: false });
          return;
        }

        syncUserData(session.user.id, session, setState, getState);
      }
    });
  },

  refreshProfile: async () => {
    const { user, session } = get();
    if (!user || !session) {
      return;
    }
    await syncUserData(user.id, session, set, get);
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

const syncUserData = async (
  userId: string,
  session: Session,
  set: SetType,
  get: GetType,
) => {
  const requestId = ++currentRequestId;

  if (currentSyncPromise) {
    return currentSyncPromise;
  }

  currentSyncPromise = (async () => {
    try {
      const state = get();
      const hasData = state.profile !== null;
      if (!hasData) set({ isLoading: true });

      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError || !sessionData.session) {
        clearStore(set);
        return;
      }

      const currentValidSession = sessionData.session;

      const { profile, vetDetails, ranchDetails } =
        await AuthService.getFullUserData(userId);

      if (requestId !== currentRequestId) {
        set({ isLoading: false });
        return;
      }

      set({
        session: currentValidSession,
        user: currentValidSession.user,
        profile,
        role: profile?.role ?? null,
        vetDetails,
        ranchDetails,
        isLoading: false,
      });
    } catch (error: unknown) {
      console.error("syncUserData error:", error);
      const err = error as { code?: string; message?: string };
      if (err.code === "PGRST303" || err.message?.includes("JWT expired")) {
        await supabase.auth.signOut();
        clearStore(set);
      } else {
        set({ isLoading: false });
      }
    } finally {
      currentSyncPromise = null;
    }
  })();

  return currentSyncPromise;
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
