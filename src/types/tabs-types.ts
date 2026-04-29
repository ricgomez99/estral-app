import { DrawerNavigationOptions } from "@react-navigation/drawer";

interface TabProps {
  tabName: string;
  tabTitle: string;
  headerShown?: boolean;
  iconName: "home" | "pencil" | "user" | "cog";
}

interface DrawerScreenProps {
  screenName: string;
  options: DrawerNavigationOptions;
}

export { TabProps, DrawerScreenProps };
