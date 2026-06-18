import { IAnimal, IFertilityRange } from "@/types/mock-types";
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

const getRangeById = async (animalId: string, rangeId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const animal = ANIMALS.find((animal) => animal.id === animalId);
  const range = animal?.fertility_ranges.find((range) => range.id === rangeId);

  return range;
};

const updateAnimalRange = async (range: IFertilityRange, animalId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const animalIndex = ANIMALS.findIndex((a) => a.id === animalId);

  if (animalIndex === -1) {
    throw new Error(`Not found animal with id: ${animalId}`);
  }

  const animal = ANIMALS[animalIndex];
  const rangeIndex = animal.fertility_ranges.findIndex(
    (r) => r.id === range?.id,
  );

  if (rangeIndex !== -1) {
    const updatedRanges = [...animal.fertility_ranges];
    updatedRanges[rangeIndex] = {
      ...updatedRanges[rangeIndex],
      ...range,
    };

    ANIMALS[animalIndex] = {
      ...animal,
      fertility_ranges: updatedRanges,
    };

    return ANIMALS[animalIndex].fertility_ranges[rangeIndex];
  }

  return undefined;
};

export {
  addAnimalMock,
  getAnimalsMock,
  getAnimalById,
  getRangeById,
  updateAnimalRange,
};
