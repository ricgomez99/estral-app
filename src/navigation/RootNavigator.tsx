import { useEffect } from "react";
import { Stack } from "expo-router";
import SpinLoader from "@/components/shared/SpinLoader";
import { useAuthStore, useNotificationsStore } from "@/stores";
import { supabase } from "@/lib";

export default function RootNavigator() {
  const { session, initialize, isLoading, profile } = useAuthStore();
  const {
    initialize: initializeNotifications,
    notification,
    response,
    expoPushToken,
  } = useNotificationsStore();

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    const syncPushToken = async () => {
      if (!session?.user.id || !expoPushToken) return;
      const { error } = await supabase
        .from("profiles")
        .update({ expo_push_token: expoPushToken })
        .eq("id", session?.user?.id);

      if (error) {
        console.error(
          "Error while updating the expo_push_token column on Supabase: ",
          error,
        );
      } else {
        console.log("Expo Push Token syncronized successfully on supabase");
      }
    };

    syncPushToken();
  }, [session?.user.id, expoPushToken]);

  useEffect(() => {
    let cleanUp: (() => void) | undefined;

    const setup = async () => {
      if (!!session) {
        cleanUp = await initializeNotifications();
      }
    };

    setup();

    return () => {
      if (cleanUp) cleanUp();
    };
  }, [initializeNotifications, session]);

  if (isLoading) {
    return <SpinLoader />;
  }

  const isAuthenticated = !!session;
  const isOnboarded = profile?.is_onboarded ?? false;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Protected Routes */}
      <Stack.Protected guard={isAuthenticated && isOnboarded}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>

      {/* Onboarding */}
      <Stack.Protected guard={isAuthenticated && !isOnboarded}>
        <Stack.Screen name="(onboarding)" />
      </Stack.Protected>

      {/* Login */}
      <Stack.Protected guard={!isAuthenticated || !isOnboarded}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}
