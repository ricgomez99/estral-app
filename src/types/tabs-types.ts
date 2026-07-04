import { ComponentProps } from "react";
import { Drawer } from "expo-router/drawer";

export type DrawerScreenOptions = ComponentProps<
  typeof Drawer.Screen
>["options"];

interface TabProps {
  tabName: string;
  tabTitle: string;
  headerShown?: boolean;
  iconName: "home" | "pencil" | "user" | "cog";
}

interface DrawerScreenProps {
  screenName: string;
  options: DrawerScreenOptions;
}

export { TabProps, DrawerScreenProps };
