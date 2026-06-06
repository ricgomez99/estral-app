import { IAnimal } from "../mock-types";

type AnimalUpdatePayload = Pick<IAnimal, "id"> & Partial<Omit<IAnimal, "id">>;

export type { AnimalUpdatePayload };
