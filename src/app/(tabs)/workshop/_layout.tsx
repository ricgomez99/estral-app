import { Drawer, DrawerToggleButton } from "expo-router/drawer";
import { DRAWER_SCREENS } from "@/utils/consts";

export default function WorkshopLayout() {
  return (
    <Drawer
      initialRouteName="animals"
      screenOptions={{
        headerShadowVisible: false,
        headerTitle: "Workshop",
        headerTitleAlign: "left",
        headerRight: () => <DrawerToggleButton />,
        headerLeft: () => null,
        drawerType: "front",
        swipeEnabled: true,
        headerBackButtonDisplayMode: "default",
      }}>
      {DRAWER_SCREENS &&
        DRAWER_SCREENS.map((screen) => (
          <Drawer.Screen
            key={screen.screenName}
            name={screen.screenName}
            options={screen.options}
          />
        ))}
    </Drawer>
  );
}
