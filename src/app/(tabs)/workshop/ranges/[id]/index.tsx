import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getAnimalById } from "@/utils/mock-functions";
import SpinLoader from "@/components/shared/SpinLoader";
import { DetailsLayout } from "@/layouts";
import { DateService } from "@/lib";
import { FlatList } from "react-native";
import ListContainer from "@/components/shared/ListContainer";
import { RangeCard } from "@/components/Details";
import { useMemo } from "react";

export default function RangeDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data: animal, isLoading } = useQuery({
    queryKey: ["animal-ranges", id],
    queryFn: () => getAnimalById(id as string),
    enabled: !!id,
  });

  const ranges = useMemo(() => {
    if (!animal) return [];

    return animal.fertility_ranges.map((range) => ({
      ...range,
      min_date: DateService.formatToLongDate(range.min_date, "en"),
      max_date: DateService.formatToLongDate(range.max_date, "en"),
    }));
  }, [animal]);

  const handleCreatePress = () => {
    router.push({
      pathname: "/workshop/ranges/create",
      params: { animalId: id },
    });
  };

  if (isLoading) {
    return <SpinLoader />;
  }
  return (
    <DetailsLayout imageSource={animal?.image} showUpdateButton={false}>
      <View style={styles.container}>
        <Text>{animal?.name}</Text>
      </View>
      <View>
        <Pressable style={styles.createButton} onPress={handleCreatePress}>
          <Text style={styles.createButtonText}>Add new range</Text>
        </Pressable>
      </View>
      <ListContainer>
        <FlatList
          data={ranges}
          extraData={ranges}
          renderItem={({ item }) => (
            <RangeCard
              max_date={item.max_date}
              min_date={item.min_date}
              creation_date={item.creation_date}
              rangeId={item.id}
              id={Number(id)}
            />
          )}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ flexGrow: 1 }}
          removeClippedSubviews={true}
          ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
        />
      </ListContainer>
    </DetailsLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  listSeparator: {
    height: 16,
  },

  createButton: {
    backgroundColor: "#111",
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
  },

  createButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#f9f9f9",
  },
});
