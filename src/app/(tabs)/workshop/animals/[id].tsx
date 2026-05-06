import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { ANIMALS } from "@/utils/mocks";
import Chip from "@/components/shared/Chip";
import { Header, GridItem } from "@/components/Details";
import { PrimaryButton } from "@/components/shared/Buttons";

export default function AnimalDetails() {
  const { id } = useLocalSearchParams();
  const subject = ANIMALS.find((animal) => animal.id === Number(id));
  const chipText =
    subject?.isDonor && !subject.isRecipient ? "Donor" : "Recipient";

  return (
    <View style={styles.detailsContainer}>
      <Image style={styles.image} source={subject?.image} />
      <View style={styles.infoContainer}>
        <Header title={subject?.name} badgeText={subject?.type} />
        <View style={styles.grid}>
          <GridItem label={true} labelText="Age">
            <Text style={styles.gridItemText}>{subject?.age}</Text>
          </GridItem>
          <GridItem label={true} labelText="Sex">
            <Text style={styles.gridItemText}>{subject?.sex}</Text>
          </GridItem>
          <GridItem label={false}>
            <Chip chipText={chipText} active={subject?.isDonor} />
          </GridItem>
          <GridItem label={true} labelText="Chip ID">
            <Text style={styles.gridItemText}>{subject?.microchipId}</Text>
          </GridItem>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <PrimaryButton title="Update" handleClick={() => {}} type="normal" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    margin: 16,
    overflow: "scroll",
    flex: 1,
  },
  image: {
    width: "100%",
    height: 200,
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
  },

  infoContainer: {
    paddingVertical: 16,
    paddingHorizontal: 5,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },

  gridItemText: {
    fontSize: 14,
    fontWeight: "700",
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
});
