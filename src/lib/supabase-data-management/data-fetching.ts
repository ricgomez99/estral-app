import { IAnimal, IReproductiveEvent } from "@/types/mock-types";
import { supabase } from "../supabase";

const getAnimals = async () => {
  const { data: animals, error } = await supabase
    .from("animals")
    .select(`*, events:reproductive_events(*)`)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[getAnimals Error]: ", error);
    throw new Error("Unable to fetch animals data from supabase");
  }

  return (animals as IAnimal[]) ?? [];
};

const getAnimalById = async (animalId: string) => {
  const { data: animal, error } = await supabase
    .from("animals")
    .select(`*, events:reproductive_events(*)`)
    .eq("id", animalId)
    .maybeSingle();

  if (error) {
    console.error("[getAnimalById Error]: ", error);
    throw new Error("Unable to fetch animal data from supabase");
  }

  return (animal as IAnimal) ?? undefined;
};

const getReproductiveEvents = async (userId: string) => {
  const { data, error } = await supabase
    .from("reproductive_events")
    .select(
      `*,
      animals (
        name
      )`,
    )
    .eq("owner_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[getReproductiveEvents Error]: ", error);
    throw new Error("Unable to fetch reproductive events data from supabase");
  }

  const events = data?.map(({ animals, ...event }) => ({
    ...event,
    animal_name: animals?.name ?? null,
  }));
  return (events as IReproductiveEvent[]) ?? [];
};

const getReproductiveEventsByAnimalId = async (animalId: string) => {
  const { data, error } = await supabase
    .from("reproductive_events")
    .select(
      `*,
      animals (
        name
      )`,
    )
    .eq("animal_id", animalId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[getReproductiveEventsByAnimalId Error]: ", error);
    throw new Error("Unable to fetch reproductive events data from supabase");
  }

  const events = data?.map(({ animals, ...event }) => ({
    ...event,
    animal_name: animals?.name ?? null,
  }));

  return (events as IReproductiveEvent[]) ?? [];
};

const getReproductiveEventById = async (eventId: string, animalId: string) => {
  const { data: event, error } = await supabase
    .from("reproductive_events")
    .select("*")
    .eq("id", eventId)
    .eq("animal_id", animalId)
    .maybeSingle();

  if (error) {
    console.error("[getReproductiveEventById Error]: ", error);
    throw new Error("Unable to fetch reproductive event data from supabase");
  }

  return (event as IReproductiveEvent) ?? undefined;
};

export {
  getAnimals,
  getAnimalById,
  getReproductiveEvents,
  getReproductiveEventsByAnimalId,
  getReproductiveEventById,
};
