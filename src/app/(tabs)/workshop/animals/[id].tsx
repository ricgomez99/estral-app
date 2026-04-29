import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { ANIMALS } from "@/utils/mocks";
import Chip from "@/components/shared/Chip";

export default function AnimalDetails() {
  const { id } = useLocalSearchParams();
  const subject = ANIMALS.find((animal) => animal.id === Number(id));
  const chipText =
    subject?.isDonor && !subject.isRecipient ? "Donor" : "Recipient";

  return (
    <View style={styles.detailsContainer}>
      <Image style={styles.image} source={subject?.image} />
      <View style={styles.infoContainer}>
        <View style={styles.header}>
          <Text style={styles.name}>{subject?.name}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{subject?.type.toUpperCase()}</Text>
          </View>
        </View>
        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <Text style={styles.gridItem}>{subject?.age}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridItem}>{subject?.sex}</Text>
          </View>
          <View style={styles.gridItem}>
            <Chip chipText={chipText} active={subject?.isDonor} />
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridItem}>{subject?.microchipId}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    margin: 16,
    overflow: "scroll",
  },
  image: {
    width: "100%",
    height: 200,
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
  },

  infoContainer: {
    padding: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A1A1A",
  },

  badge: {
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#777",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  gridItem: {
    width: "50%",
    marginBottom: 16,
  },
});
