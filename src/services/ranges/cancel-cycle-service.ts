import { supabase } from "@/lib";

interface ICancelCycleParams {
  cycleId: string;
  animalId: string;
  reason: string;
}

export default async function cancelCycleService({
  cycleId,
  animalId,
  reason,
}: ICancelCycleParams) {
  const { data: cancelledEvents, error: cancelError } = await supabase
    .from("reproductive_events")
    .update({
      cancelled: true,
      cancellation_reason: reason,
    })
    .eq("cycle_id", cycleId)
    .eq("completed", false)
    .select();

  if (cancelError) throw cancelError;

  const { error: animalError } = await supabase
    .from("animals")
    .update({
      condition: "Not Pregnant",
    })
    .eq("id", animalId);

  if (animalError) throw animalError;

  return cancelledEvents;
}
