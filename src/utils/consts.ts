import { OptionType } from "@/types/picker-types";
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
    screenName: "animals",
    options: {
      drawerLabel: "Animals",
    },
  },
  {
    screenName: "ranges",
    options: {
      drawerLabel: "Ranges",
    },
  },
  {
    screenName: "calculations",
    options: {
      drawerLabel: "Calculations",
    },
  },
];

const DATE_ES_FORMAT = "d 'de' MMMM 'de' yyyy";
const DATE_EN_FORMAT = "MMMM do, yyyy";

const sexOptions: OptionType[] = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
];

const typeOptions: OptionType[] = [
  { label: "Donkey", value: "donkey" },
  { label: "Horse", value: "horse" },
  { label: "Zebra", value: "zebra" },
];

export {
  VIEW_TABS,
  DRAWER_SCREENS,
  DATE_EN_FORMAT,
  DATE_ES_FORMAT,
  sexOptions,
  typeOptions,
};
