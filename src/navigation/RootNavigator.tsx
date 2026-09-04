import { useEffect } from "react";
import { Stack } from "expo-router";
import SpinLoader from "@/components/shared/SpinLoader";
import { useAuthStore } from "@/stores";
import { useInitNotifications, useSyncPushToken } from "@/hooks/notifications";

export default function RootNavigator() {
  const { session, initialize, isLoading, profile } = useAuthStore();

  useEffect(() => {
    initialize();
  }, []);

  useInitNotifications();
  useSyncPushToken();

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
