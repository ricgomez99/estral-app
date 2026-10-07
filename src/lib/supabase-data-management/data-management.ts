import { supabase } from "../supabase";
import { IInsertReproductionEventDTO } from "@/types/reproductive-calculation-types";

const createReproductionEvent = async (
  payload: IInsertReproductionEventDTO[],
  animalId: string,
) => {
  const { data: insertedEvents, error } = await supabase
    .from("reproductive_events")
    .insert(payload)
    .eq("animal_id", animalId)
    .select();
  if (error) {
    console.error("[createReproductiveEvent Error]: ", error);
    throw new Error(
      error.message || `Error while creating a reproductive event on supabase`,
    );
  }

  return { insertedEvents };
};

const updateAnimal = async (
  payload: Record<string, unknown>,
  animalId: string,
) => {
  const { data: updatedAnimal, error } = await supabase
    .from("animals")
    .update(payload)
    .eq("id", animalId)
    .select()
    .single();

  if (error) {
    console.error("[updateAnimal Error]: ", error);
    throw new Error(error.message || `Error while updating animal on supabase`);
  }

  return updatedAnimal;
};

const createAnimalWithEvents = async (
  eventsPayload: Record<string, unknown>[],
  animalPayload: Record<string, unknown>,
) => {
  const { data, error } = await supabase.rpc("create_animal_with_events", {
    animal_payload: animalPayload,
    events_payload: eventsPayload,
  });

  if (error) {
    console.error("[createAnimalWithEvents Error]: ", error);
    throw new Error(
      error.message || `Error while creating animal with events on supabase`,
    );
  }

  return { animal: data.animal, events: data.events };
};

export { createReproductionEvent, updateAnimal, createAnimalWithEvents };
