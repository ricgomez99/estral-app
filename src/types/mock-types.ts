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
}

interface IDateRange {
  id: string | number;
  subject: Pick<IAnimal, "name" | "image">;
  min_date: string;
  max_date: string;
}

type Species = "horse" | "donkey" | "zebra";
type Sex = "Male" | "Female";

export type { IAnimal, IDateRange, Species, Sex };
