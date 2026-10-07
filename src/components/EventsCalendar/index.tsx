import { AgendaList, Calendar, CalendarProvider } from "react-native-calendars";
import { useCallback, useMemo, useState } from "react";
import { CalendarEventsService } from "@/services";
import useRawEventsData from "@/hooks/useRawEventsData";
import { ICalendarPeriod, MarkedDate } from "@/types/calendar-types";
import EventsListItem from "../EventsListItem";
import AgendaListHeader from "../AgendaListHeader";

export default function EventsCalendar() {
  const { events, isLoading } = useRawEventsData();
  const today = useMemo(() => new Date().toISOString().split("T")[0], []);
  const [currentMonth, setCurrentMonth] = useState(() => today.substring(0, 7));

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
    const dateKeys = Object.keys(baseMarkedDates);
    if (!baseMarkedDates || dateKeys.length === 0) return [];

    const currentMonthKeys = dateKeys.filter((dateKey) =>
      dateKey.startsWith(currentMonth),
    );

    const sortedDateKeys = currentMonthKeys.sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime(),
    );

    return sortedDateKeys
      .map((dataKey) => ({
        title: dataKey,
        data: baseMarkedDates[dataKey]?.periods || [],
      }))
      .filter((section) => section.data.length > 0);
  }, [baseMarkedDates, currentMonth]);

  const handleMonthChange = useCallback((month: { dateString: string }) => {
    setCurrentMonth(month.dateString.substring(0, 7));
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: ICalendarPeriod }) => (
      <EventsListItem
        animalName={item.animalName}
        description={item.description}
        eventType={item.eventType}
      />
    ),
    [],
  );

  const renderAgendaHeader = useCallback(
    (title: string | any) => <AgendaListHeader sectionTitle={title} />,
    [],
  );

  const keyExtractor = (item: ICalendarPeriod, index: number) => {
    return `${item.eventType}-${item.animalName}-${index}`;
  };

  return (
    <CalendarProvider
      style={{ flex: 1 }}
      date={today}
      showTodayButton
      disabledOpacity={0.6}>
      <Calendar
        firstDay={1}
        markingType="multi-period"
        markedDates={baseMarkedDates}
        onMonthChange={handleMonthChange}
      />
      <AgendaList
        sections={agendaItems}
        renderItem={renderItem}
        renderSectionHeader={renderAgendaHeader}
        keyExtractor={keyExtractor}
        dayFormatter={(day) => day}
        initialNumToRender={6}
        maxToRenderPerBatch={5}
        windowSize={5}
      />
    </CalendarProvider>
  );
}
