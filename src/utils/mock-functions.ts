import { IAnimal, IDateRange } from "@/types/mock-types";
import { ANIMALS, DATE_RANGES } from "./mocks";

const addAnimalMock = (newAnimal: IAnimal) => ANIMALS.push(newAnimal);
const getAnimalsMock = async (): Promise<IAnimal[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return ANIMALS;
};

const getAnimalById = async (
  id: string | number,
): Promise<IAnimal | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return ANIMALS.find((animal) => animal.id === id);
};

const getRanges = async (): Promise<IDateRange[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return DATE_RANGES;
};

const getRangeById = async (id: string | number) => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return DATE_RANGES.find((range) => range.id === id);
};
const addRange = (range: IDateRange) => DATE_RANGES.push(range);

export {
  addAnimalMock,
  getAnimalsMock,
  getAnimalById,
  getRanges,
  getRangeById,
  addRange,
};
