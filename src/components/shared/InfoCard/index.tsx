import { View, Text, StyleSheet } from "react-native";
import Feather from "@expo/vector-icons/Feather";

interface ICardProps {
  children: React.ReactNode;
  cardTitle: string | undefined;
}

export default function InfoCard({ children, cardTitle }: ICardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Feather name="alert-circle" size={16} color="black" />
        <Text style={styles.headerTitle}>{cardTitle}</Text>
      </View>
      <View style={styles.cardContent}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: "100%",
    paddingVertical: 8,
    gap: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 16,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#bbb",
    paddingHorizontal: 10,
    paddingBottom: 5,
  },

  headerTitle: {
    fontSize: 14,
    fontWeight: "700",
  },

  cardContent: {
    paddingHorizontal: 10,
    gap: 6,
  },
});
