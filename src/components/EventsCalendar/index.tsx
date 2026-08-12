import { Calendar } from "react-native-calendars";
import { useState } from "react";

export default function EventsCalendar() {
  const [selected, setSelected] = useState("");

  return (
    <Calendar
      onDayPress={(day) => {
        setSelected(day.dateString);
      }}
      markedDates={{
        [selected]: {
          selected: true,
          disableTouchEvent: true,
          selectedColor: "orange",
        },
      }}
    />
  );
}
