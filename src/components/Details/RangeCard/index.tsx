import { View, Text, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface ICardProps {
  min_date: string | undefined;
  max_date: string | undefined;
  creation_date: string | undefined;
  rangeId: string | number | undefined;
  id: string | number | undefined;
}

export default function RangeCard({
  min_date,
  max_date,
  creation_date,
  rangeId,
  id,
}: ICardProps) {
  const router = useRouter();

  const handlePressUpdate = () => {
    router.push(`/workshop/ranges/${id}/${rangeId}`);
  };

  const handlePressDelete = () => {};

  return (
    <View style={styles.card}>
      <View style={styles.cardDates}>
        <View style={styles.dateWrapper}>
          <Text style={styles.dateLabel}>Min Date:</Text>
          <Text style={styles.dateText}>{min_date}</Text>
        </View>
        <View style={styles.dateWrapper}>
          <Text style={styles.dateLabel}>Max Date:</Text>
          <Text style={styles.dateText}>{max_date}</Text>
        </View>
        <View style={styles.dateWrapper}>
          <Text style={styles.dateLabel}>Creation Date:</Text>
          <Text style={styles.dateText}>{creation_date}</Text>
        </View>
      </View>
      <View style={styles.actionButtons}>
        <Pressable style={styles.button} onPress={handlePressUpdate}>
          <Feather size={24} name="edit-2" color="#e1e1e1" />
        </Pressable>
        <Pressable style={styles.button} onPress={handlePressDelete}>
          <Feather size={24} name="x-circle" color="#e1e1e1" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    padding: 12,
    gap: 6,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
  },
  cardDates: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    maxWidth: "70%",
    gap: 10,
  },

  dateWrapper: {
    flexDirection: "column",
    gap: 2,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#474E68",
  },

  actionButtons: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },

  button: {
    width: "auto",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
    backgroundColor: "#111",
    borderRadius: "100%",
    borderWidth: 1,
    borderColor: "#111",
  },
});
