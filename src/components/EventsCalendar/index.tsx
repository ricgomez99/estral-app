import { Calendar } from "react-native-calendars";
import { useState, useMemo } from "react";
import { CalendarEventsService } from "@/services";
import useRawEventsData from "@/hooks/useRawEventsData";
import { MarkedDate, ICalendarPeriod } from "@/types/calendar-types";

export default function EventsCalendar() {
  const [selected, setSelected] = useState("");

  const { events, isLoading } = useRawEventsData();

  const baseMarkedDates = useMemo(() => {
    if (!events || events.length === 0) return {};

    return events.reduce<MarkedDate>((acc, event) => {
      return CalendarEventsService.createMarkedDate(
        event.min_date,
        event.max_date,
        event.mark_type,
        {
          animalName: event.animal_name,
          description: event.description,
          eventType: event.event_type,
        },
        acc,
      );
    }, {});
  }, [events]);

  const agendaItems = useMemo(() => {
    const items: { [key: string]: ICalendarPeriod[] } = {};
    Object.keys(baseMarkedDates).forEach((dateKey) => {
      const periods = baseMarkedDates[dateKey]?.periods || [];
      items[dateKey] = periods;
    });

    return items;
  }, [baseMarkedDates]);

  const markedDates = useMemo(() => {
    if (!baseMarkedDates) return {};
    if (!selected) return baseMarkedDates;
    return {
      ...baseMarkedDates,
      [selected]: {
        ...baseMarkedDates[selected],
        selected: true,
        selectedColor: "#E0E0E0",
      },
    };
  }, [baseMarkedDates, selected]);

  const selectedEvents = baseMarkedDates[selected]?.periods || [];

  return (
    <Calendar
      markingType="multi-period"
      onDayPress={(day) => {
        setSelected(day.dateString);
      }}
      markedDates={markedDates}
    />
  );
}
