import { IAnimal, IReproductiveEvent } from "@/types/mock-types";
import { ANIMALS } from "./mocks";
import * as crypto from "expo-crypto";
import { DateService } from "@/lib/date-fns/dates";

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
  const range = animal?.events?.find((range) => range.id === rangeId);

  return range;
};

const updateAnimalRange = async (
  range: IReproductiveEvent,
  animalId: string,
) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const animalIndex = ANIMALS.findIndex((a) => a.id === animalId) ?? "";

  if (animalIndex === -1) {
    throw new Error(`Not found animal with id: ${animalId}`);
  }

  let animal = ANIMALS[animalIndex] as IAnimal;
  let animalEvents = animal?.events ?? [];

  if (!animal) {
    throw new Error(`Unable to find animal with id: ${animalId}`);
  }

  const rangeIndex = animal.events?.findIndex((r) => r.id === range?.id)!;
  const currentEvents = animal?.events ?? [];

  if (rangeIndex !== -1) {
    const updatedRanges = [...currentEvents];
    updatedRanges[rangeIndex] = {
      ...updatedRanges[rangeIndex],
      ...range,
    };

    animal = {
      ...animal,
      events: updatedRanges,
    };

    return animalEvents[rangeIndex];
  }

  return undefined;
};

const createAnimalRange = async (
  animalId: string,
  newRangeEevent: Omit<
    IReproductiveEvent,
    "id" | "creation_at" | "animal_name"
  >,
) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const animal = ANIMALS.find((a) => a.id === animalId);
  let animalEvents = animal?.events ?? [];

  if (!animal) {
    throw new Error("No range available to process");
  }

  const fullRangeData = {
    ...newRangeEevent,
    id: crypto.randomUUID(),
    creation_at: DateService.formatToStoredDate(new Date()) as string,
    animal_name: animal.name as string,
  };

  animal.events = [...animalEvents, fullRangeData];

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
