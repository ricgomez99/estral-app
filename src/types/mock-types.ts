interface IAnimal {
  id: string | number;
  name: string;
  age: number;
  type: Species;
  sex: Sex;
  microchipId?: string;
  isRecipient?: boolean;
  isDonor?: boolean;
  image: string;
  fertility_ranges: IFertilityRange[];
}

interface IFertilityRange {
  id: string | number;
  subject?: string;
  min_date: string;
  max_date: string;
  creation_date: string;
}

type Species = "horse" | "donkey" | "zebra";
type Sex = "Male" | "Female";

export type { IAnimal, IFertilityRange, Species, Sex };
