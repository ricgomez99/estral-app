import { IAnimal, IDateRange } from "@/types/mock-types";

const ANIMALS: IAnimal[] = [
  {
    id: 1,
    name: "Princesa",
    age: 5,
    type: "horse",
    sex: "Female",
    microchipId: "chip123",
    isRecipient: true,
    isDonor: false,
    image: require("../../assets/default-horse.jpg"),
  },
  {
    id: 2,
    name: "Babieca",
    age: 7,
    type: "horse",
    sex: "Female",
    microchipId: "chip234",
    isRecipient: true,
    isDonor: false,
    image: require("../../assets/default-horse.jpg"),
  },
  {
    id: 3,
    name: "Malvina",
    age: 4,
    type: "donkey",
    sex: "Female",
    microchipId: "chip887",
    isRecipient: false,
    isDonor: true,
    image: require("../../assets/default-horse.jpg"),
  },
];

const DATE_RANGES: IDateRange[] = [
  {
    id: 1,
    subject: {
      name: "Malvina",
      image: require("../../assets/default-horse.jpg"),
    },
    min_date: "2026-06-01",
    max_date: "2026-06-06",
  },
  {
    id: 2,
    subject: {
      name: "Babieca",
      image: require("../../assets/default-horse.jpg"),
    },
    min_date: "2026-06-01",
    max_date: "2026-06-06",
  },
  {
    id: 3,
    subject: {
      name: "Princesa",
      image: require("../../assets/default-horse.jpg"),
    },
    min_date: "2026-06-01",
    max_date: "2026-06-06",
  },
];

export { ANIMALS, DATE_RANGES };
