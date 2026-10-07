import { CalendarEventsService } from "@/services/calendar/calendar-events-service";
import { MarkedDate } from "@/types/calendar-types";
import { ICreateReproductiveEventPayload } from "@/types/reproductive-calculation-types";

export default function createMarkedDatesFromEevents(
  events: ICreateReproductiveEventPayload[],
  markedDates: MarkedDate,
) {
  let cumulativeMarks: MarkedDate = markedDates ?? {};

  for (const event of events) {
    cumulativeMarks = CalendarEventsService.createMarkedDate(
      event.min_date,
      event.max_date,
      event.mark_type,
      {
        animalName: event.animal_name,
        eventType: event.event_type,
        description: event.description as string,
      },
      cumulativeMarks,
    );
  }

  return cumulativeMarks;
}
