import { Stack } from "expo-router";

export default function AnimalsLayout() {
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
        name="[id]/update-animal"
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
          title: "Add Animal Form",
        }}
      />
    </Stack>
  );
}
