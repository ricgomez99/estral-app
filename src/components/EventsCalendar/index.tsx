import { Calendar } from "react-native-calendars";
import { useState, useMemo } from "react";
import { CalendarEventsService } from "@/services";

export default function EventsCalendar() {
  const [selected, setSelected] = useState("");

  const baseMarkedDates = useMemo(() => {
    return CalendarEventsService.createMarkedDate(
      "2026-08-13",
      "2026-08-17",
      "natural_range",
      {
        animalName: "Babieca",
        eventType: "Pregnancy confirmation",
        description: "The animal should be confirmed as pregnant",
      },
    );
  }, []);

  const markedDates = useMemo(() => {
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
