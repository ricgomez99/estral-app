import { IAnimal, IFertilityRange } from "@/types/mock-types";
import { ANIMALS } from "./mocks";
import { DateService } from "@/lib";
import * as crypto from "expo-crypto";

const addAnimalMock = async (
  newAnimal: Omit<IAnimal, "id" | "fertility_ranges">,
) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  if (!newAnimal) return;

  const fullNewAnimal = {
    ...newAnimal,
    id: crypto.randomUUID().toString(),
    fertility_ranges: [],
  };

  ANIMALS.push(fullNewAnimal);

  return fullNewAnimal;
};
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

const createAnimalRange = async (
  animalId: string,
  newRange: Omit<IFertilityRange, "id" | "creation_date" | "subject">,
) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const animal = ANIMALS.find((a) => a.id === animalId);

  if (!animal) {
    throw new Error("No range available to process");
  }

  const fullRangeData = {
    ...newRange,
    id: crypto.randomUUID(),
    creation_date: DateService.formatToStoredDate(new Date()) as string,
    subject: animal.name as string,
  };

  animal.fertility_ranges = [...animal.fertility_ranges, fullRangeData];

  return fullRangeData;
};

export {
  addAnimalMock,
  getAnimalsMock,
  getAnimalById,
  getRangeById,
  updateAnimalRange,
  createAnimalRange,
};
