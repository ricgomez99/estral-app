import { OptionType } from "@/types/picker-types";
import { TabProps, DrawerScreenProps } from "@/types/tabs-types";
import {
  IReproductionStrategyConfig,
  ReproductionType,
  ReproductiveMilestone,
} from "@/types/reproductive-calculation-types";
import { generateRecipientTranferEvent } from "@/helpers/custom-events";

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

const conditionOptions: OptionType[] = [
  { label: "Young Female", value: "Young Female" },
  { label: "Pregnant", value: "Pregnant" },
  { label: "Not Pregnant", value: "Not Pregnant" },
];

const medicationOptions: OptionType[] = [
  { label: "Gnrh", value: "gnrh" },
  { label: "Progesterone", value: "progesterone" },
];

const images = {
  defaultHorse: require("../../assets/default-horse.jpg"),
  googleLogo: require("../../assets/google.png"),
};

const BREEDS = [
  "Colombian Criollo Horse (CCC)",
  "Purebred Spanish Horse (PRE)",
  "Purebred Lusitano",
  "Gypsy",
  "Arabian horse",
  "American Quarter Horse",
  "Friesian horse",
  "Apaloosa",
  "Shire",
  "Percheron",
  "Dutch Warmblood (KWPN)",
  "Thoroughbred horse",
  "Hanoverian",
  "Azteca",
  "Argentine Sport Horse",
  "Chilean Criollo",
  "Peruvian Paso Horse",
  "Mangalarga Marchador",
] as const;

const MIXES = ["Mix 1", "Mix 2", "Mix 3", "Mix 4"] as const;

const REPRODUCTION_TYPES = ["Natural", "Insemination", "Transfer"];

const REPRODUCTIVE_MILESTONES: ReproductiveMilestone = {
  first_pregnancy_check: {
    min_days: 14,
    max_days: 16,
    title: "Pregnancy Check",
    description: "Verify if the animal is indeed pregnant",
    event_type: "pregnancy_check",
  },
  second_pregnancy_check: {
    min_days: 25,
    max_days: 30,
    title: "Secondary Pregnancy Check",
    description: "Additional pregnancy check control",
    event_type: "pregnancy_check",
  },
  discharge_confirmation: {
    min_days: 45,
    max_days: 50,
    title: "Medical Discharge Confirmation",
    description: "Definitive confirmation for the animal's pregnancy status",
    event_type: "treatment",
  },
  first_control: {
    min_days: 70,
    max_days: 80,
    title: "Antenatal Care",
    description: "Check the fetus's status",
    event_type: "treatment",
  },
  second_control: {
    min_days: 235,
    max_days: 245,
    title: "Determine Birth Type",
    description: "Verify the animal conditions and possible birth type",
    event_type: "birth_type_check",
  },
  expected_birth: {
    min_days: 330,
    max_days: 350,
    title: "Expected Birth",
    description: "Prepare for the birth of the animal",
    event_type: "expected_birth",
  },
};

const REPRODUCTIVE_MILESTONES_DONANT_TRANSFER: ReproductiveMilestone = {
  embryon_flush: {
    min_days: 7,
    max_days: 9,
    title: "Embryo Check & Flush",
    description: "Check the embryo status and complete the flush process",
    event_type: "embryo_flush",
  },
  next_estrus: {
    min_days: 18,
    max_days: 23,
    title: "Next Estrus",
    description: "The next possible estrus range",
    event_type: "estrus_range",
  },
};

const REPRODUCTIVE_MILESTONES_RECEPTOR_TRANSFER: ReproductiveMilestone = {
  receptor_pregnancy_check: {
    min_days: 14,
    max_days: 16,
    title: "Receptor Pregnancy Check",
    description: "Verification for embryo transferred at day: ",
    event_type: "pregnancy_check",
  },
  expected_birth: {
    min_days: 330,
    max_days: 350,
    title: "Expected Birth",
    description: "Projected birth date adjusted by embryo age",
    event_type: "expected_birth",
  },
};

const REPRODUCTION_STRATEGIES: Record<
  ReproductionType,
  IReproductionStrategyConfig
> = {
  natural: {
    type: "natural",
    defaultMark: "natural_range",
    suggestedCondition: "Pregnant",
  },
  insemination: {
    type: "insemination",
    defaultMark: "insemination_range",
    suggestedCondition: "Pregnant",
  },
  transfer: {
    type: "transfer",
    defaultMark: "transfer_range",
    suggestedCondition: "Pregnant",
    customEventGenerator: generateRecipientTranferEvent,
  },
};

export {
  VIEW_TABS,
  DRAWER_SCREENS,
  REPRODUCTIVE_MILESTONES,
  REPRODUCTIVE_MILESTONES_DONANT_TRANSFER,
  REPRODUCTIVE_MILESTONES_RECEPTOR_TRANSFER,
  REPRODUCTION_STRATEGIES,
  DATE_EN_FORMAT,
  DATE_ES_FORMAT,
  REPRODUCTION_TYPES,
  BREEDS,
  MIXES,
  sexOptions,
  typeOptions,
  medicationOptions,
  conditionOptions,
  images,
};
