import { View, Text, StyleSheet } from "react-native";
import { DateService } from "@/lib";

interface IProps {
  sectionTitle: string;
}

export default function AgendaListHeader({ sectionTitle }: IProps) {
  const { formatToLongDate } = DateService;
  const formattedDate = formatToLongDate(sectionTitle, "en");

  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{formattedDate}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    backgroundColor: "#F4F4F6",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4b5563",
  },
});
