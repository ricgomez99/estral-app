import { ICalendarPeriod } from "@/types/calendar-types";
import { View, StyleSheet, Text } from "react-native";

export default function EventsListItem({
  animalName,
  eventType,
  description,
}: ICalendarPeriod) {
  return (
    <View style={styles.item}>
      <View style={styles.header}>
        <Text style={styles.itemTitle}>{animalName}</Text>
        <Text style={styles.itemSubtitle}>{eventType}</Text>
      </View>
      <View>
        <Text>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 20,
    height: 100,
    backgroundColor: "#FFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#b1b1b1",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  itemTitle: {
    color: "#111",
    marginLeft: 16,
    fontWeight: "800",
    fontSize: 16,
  },
  itemSubtitle: {
    color: "#bbbb",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
