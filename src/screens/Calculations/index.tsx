import { Text, View } from "react-native";
import EventsCalendar from "@/components/EventsCalendar";

export default function Calculations() {
  return (
    <View style={{ flex: 1 }}>
      <Text>Events</Text>
      <EventsCalendar />
    </View>
  );
}
