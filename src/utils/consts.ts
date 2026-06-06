import { TabProps, DrawerScreenProps } from "@/types/tabs-types";

const VIEW_TABS: TabProps[] = [
  {
    tabName: "index",
    tabTitle: "Home",
    iconName: "home",
  },
  {
    tabName: "workshop",
    tabTitle: "Workshop",
    headerShown: false,
    iconName: "pencil",
  },
  {
    tabName: "profile",
    tabTitle: "Profile",
    iconName: "user",
  },
  {
    tabName: "settings",
    tabTitle: "Settings",
    iconName: "cog",
  },
];

const DRAWER_SCREENS: DrawerScreenProps[] = [
  {
    screenName: "animals/index",
    options: {
      drawerLabel: "Animals",
    },
  },
  {
    screenName: "ranges/index",
    options: {
      drawerLabel: "Ranges",
    },
  },
  {
    screenName: "calculations/index",
    options: {
      drawerLabel: "Calculations",
    },
  },
  {
    screenName: "animals/[id]",
    options: {
      drawerItemStyle: { display: "none" },
    },
  },
  {
    screenName: "ranges/[id]",
    options: {
      drawerItemStyle: { display: "none" },
    },
  },
  {
    screenName: "calculations/[id]",
    options: {
      drawerItemStyle: { display: "none" },
    },
  },
];

export { VIEW_TABS, DRAWER_SCREENS };
