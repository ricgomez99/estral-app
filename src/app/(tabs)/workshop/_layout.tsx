import { DrawerToggleButton } from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";

export default function WorkshopLayout() {
  return (
    <Drawer
      initialRouteName="animals/index"
      screenOptions={{
        headerShadowVisible: false,
        headerTitle: "Workshop",
        headerTitleAlign: "left",
        headerRight: () => <DrawerToggleButton />,
        headerLeft: () => null,
        drawerType: "front",
        swipeEnabled: true,
      }}>
      <Drawer.Screen
        name="animals/index"
        options={{
          drawerLabel: "Animals",
        }}
      />
      <Drawer.Screen
        name="ranges/index"
        options={{
          drawerLabel: "Ranges",
        }}
      />

      <Drawer.Screen
        name="calculations/index"
        options={{
          drawerLabel: "Calculations",
        }}
      />
      <Drawer.Screen
        name="animals/[id]"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="ranges/[id]"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />

      <Drawer.Screen
        name="calculations/[id]"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
    </Drawer>
  );
}
