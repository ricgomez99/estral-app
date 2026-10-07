import { IReproductiveEvent } from "@/types/mock-types";

export default function canStartNewReproductiveCycle(
  events: IReproductiveEvent[] = [],
) {
  if (!events || events.length === 0) return true;

  const hasActiveEvents = events.some(
    (event) => !event.completed && !event.cancelled,
  );

  return !hasActiveEvents;
}
