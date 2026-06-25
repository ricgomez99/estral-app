import { Stack } from "expo-router";

export default function RangesLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="[id]/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[id]/[rangeId]"
        options={{
          headerShadowVisible: false,
          presentation: "modal",
          title: "Edit Form",
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          headerShadowVisible: false,
          presentation: "modal",
          title: "Add New Range",
        }}
      />
    </Stack>
  );
}
