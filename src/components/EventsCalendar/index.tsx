import { AgendaList, Calendar, CalendarProvider } from "react-native-calendars";
import { useState, useMemo } from "react";
import { CalendarEventsService } from "@/services";
import useRawEventsData from "@/hooks/useRawEventsData";
import { ICalendarPeriod, MarkedDate } from "@/types/calendar-types";
import { Text, View } from "react-native";

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
    if (!baseMarkedDates) return [];

    return Object.keys(baseMarkedDates).map((dataKey) => ({
      title: dataKey,
      data: baseMarkedDates[dataKey]?.periods || [],
    }));
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
  const today = new Date().toISOString().split("T")[0];
  return (
    <CalendarProvider date={today}>
      <Calendar
        firstDay={1}
        markingType="multi-period"
        onDayPress={(day) => {
          setSelected(day.dateString);
        }}
        markedDates={markedDates}
      />
      <AgendaList
        sections={agendaItems}
        renderItem={({ item }: { item: ICalendarPeriod }) => (
          <View>
            <Text>{item.animalName}</Text>
            <Text>{item.eventType}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </CalendarProvider>
  );
}
