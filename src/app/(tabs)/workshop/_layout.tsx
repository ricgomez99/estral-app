import { DrawerToggleButton } from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";

export default function WorkshopLayout() {
  return (
    <Drawer
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
        name="index"
        options={{
          drawerLabel: "Animals",
        }}
      />
      <Drawer.Screen
        name="ranges"
        options={{
          drawerLabel: "Ranges",
        }}
      />

      <Drawer.Screen
        name="calculations"
        options={{
          drawerLabel: "Calculations",
        }}
      />
    </Drawer>
  );
}
