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

type ReproductiveEventType =
  | "estrus_range"
  | "embryo_flush"
  | "pregnancy_check"
  | "birth_type_check"
  | "expected_birth"
  | "treatment";

type MarkType =
  | "natural_range"
  | "insemination_range"
  | "transfer_range"
  | "donant_transfer_range";

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

interface IReproductiveEvent {
  id: string;
  animal_id: string;
  animal_name: string;
  event_type: ReproductiveEventType;
  mark_type: MarkType;
  title: string;
  description?: string;
  min_date: string;
  max_date: string;
  completed: boolean;
  created_at: string;
}

type Species = "horse" | "donkey" | "zebra";
type Sex = "Male" | "Female";
type Medication = "gnrh" | "progesterone";
type Breed = PureBreed | Mixed;
type PureBreed = (typeof BREEDS)[number];
type Mixed = (typeof MIXES)[number];
type Condition = "Young Female" | "Pregnant" | "Not Pregnant";
type ReproductiveCondition = "Pregnant" | "Open" | "Insemination Ready";

export type {
  IAnimal,
  IFertilityRange,
  Species,
  Sex,
  Medication,
  ReproductiveEventType,
  MarkType,
  Condition,
  ReproductiveCondition,
};
