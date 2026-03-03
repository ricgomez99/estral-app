import { TabProps } from "@/types/tabs-types";

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

export { VIEW_TABS };
