interface IAnimal {
  id: string | number;
  name: string;
  age: string;
  type: Species;
  sex: Sex;
  microchipId?: string;
  isRecipient?: boolean;
  isDonor?: boolean;
  image: string;
  last_oestrus?: string;
  fertility_ranges: IFertilityRange[];
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

export type { IAnimal, IFertilityRange, Species, Sex, Medication };
