import { Stack } from "expo-router";

export default function CalculationsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="[id]/index"
        options={{ title: "Calculation Details" }}
      />
      <Stack.Screen
        name="[id]/update-calculation"
        options={{
          headerShadowVisible: false,
          presentation: "modal",
          title: "Edit Form",
        }}
      />
    </Stack>
  );
}
