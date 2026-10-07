import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import Chip from "@/components/shared/Chip";
import { CardHeader, GridItem } from "@/components/Details";
import { useQuery } from "@tanstack/react-query";
import { getAnimalById } from "@/lib/supabase-data-management/data-fetching";
import SpinLoader from "@/components/shared/SpinLoader";
import { DetailsLayout } from "@/layouts";

export default function AnimalDetails() {
  const { id } = useLocalSearchParams();
  const { data: subject, isLoading } = useQuery({
    queryKey: ["animal", id],
    queryFn: () => getAnimalById(id as string),
    enabled: !!id,
  });

  const chipTextOptions = {
    donor: "Donor",
    recipient: "Recipient",
    defualt: "No Role Asigned",
  };

  const chipText = () => {
    if (subject?.is_recipient) {
      return chipTextOptions.recipient;
    }

    if (subject?.is_donor) {
      return chipTextOptions.donor;
    }

    return chipTextOptions.defualt;
  };

  const updateButtonRoute = `/workshop/animals/${id}/update-animal`;

  if (isLoading) {
    return <SpinLoader />;
  }

  return (
    <DetailsLayout
      updateRoute={updateButtonRoute}
      imageSource={subject?.image as string}>
      <View style={styles.infoContainer}>
        <CardHeader title={subject?.name} badgeText={subject?.type} />
        <View style={styles.grid}>
          <GridItem label={true} labelText="Age">
            <Text style={styles.gridItemText}>{String(subject?.age)}</Text>
          </GridItem>
          <GridItem label={true} labelText="Sex">
            <Text style={styles.gridItemText}>{subject?.sex}</Text>
          </GridItem>
          <GridItem label={false}>
            <Chip chipText={chipText()} active={subject?.is_donor} />
          </GridItem>
          <GridItem label={true} labelText="Chip ID">
            <Text style={styles.gridItemText}>
              {subject?.microchip_id || "N/A"}
            </Text>
          </GridItem>
        </View>
      </View>
    </DetailsLayout>
  );
}

const styles = StyleSheet.create({
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
});
