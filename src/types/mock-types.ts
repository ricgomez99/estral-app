import { BREEDS, MIXES } from "@/utils/consts";

interface INaturalReproduction {
  type: "natural";
  date: string;
}

interface IInseminationReproduction {
  type: "insemination";
  date: string;
}

interface ITransferReproduction {
  type: "transfer";
  date: string;
  embryon_days: number | undefined;
}

type ReproductionDetails =
  | INaturalReproduction
  | IInseminationReproduction
  | ITransferReproduction;

interface IAnimal {
  id: string | number;
  name: string;
  age: number;
  type: Species | undefined | string;
  sex: Sex | undefined | string;
  breed?: Breed;
  condition?: Condition;
  reproduction_details?: ReproductionDetails;
  microchipId?: string;
  isRecipient?: boolean;
  isDonor?: boolean;
  image: string;
  last_oestrus?: string;
  fertility_ranges?: IFertilityRange[];
}

interface IFertilityRange {
  id: string | number;
  subject?: string;
  medicated?: boolean;
  medication?: Medication | null;
  application_date?: string;
  min_date: string;
  max_date: string;
  creation_date: string;
}

type Species = "horse" | "donkey" | "zebra";
type Sex = "Male" | "Female";
type Medication = "gnrh" | "progesterone";
type Breed = PureBreed | Mixed;
type PureBreed = (typeof BREEDS)[number];
type Mixed = (typeof MIXES)[number];
type Condition = "Young Female" | "Pregnant" | "Not Pregnant";

export type { IAnimal, IFertilityRange, Species, Sex, Medication };
