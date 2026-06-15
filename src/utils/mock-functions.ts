import { IAnimal } from "@/types/mock-types";
import { ANIMALS } from "./mocks";

const addAnimalMock = (newAnimal: IAnimal) => ANIMALS.push(newAnimal);
const getAnimalsMock = async (): Promise<IAnimal[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return ANIMALS;
};

const getAnimalById = async (id: string): Promise<IAnimal | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return ANIMALS.find((animal) => animal.id === id);
};

// const getRanges = async (): Promise<IDateRange[]> => {
//   await new Promise((resolve) => setTimeout(resolve, 800));

//   return DATE_RANGES;
// };

const getRangeById = async (animalId: string, rangeId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const animal = ANIMALS.find((animal) => animal.id === animalId);
  const range = animal?.fertility_ranges.find((range) => range.id === rangeId);

  return range;
};

export { addAnimalMock, getAnimalsMock, getAnimalById, getRangeById };
