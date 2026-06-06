import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useAppStateFocus from "@/hooks/useAppStateFocus";
import { SafeAreaProvider } from "react-native-safe-area-context";

const queryClient = new QueryClient();
export default function Layout() {
  useAppStateFocus();
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
