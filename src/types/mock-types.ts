interface Animal {
  id: number;
  name: string;
  age: number;
  type: Species;
  sex: Sex;
  microchipId?: string;
  isRecipient?: boolean;
  isDonor?: boolean;
  image: string;
}

type Species = "horse" | "donkey" | "zebra";
type Sex = "Male" | "Female";

export type { Animal };
