import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getAnimalById } from "@/utils/mock-functions";
import SpinLoader from "@/components/shared/SpinLoader";
import { DetailsLayout } from "@/layouts";
import { DateService } from "@/lib";
import { FlatList } from "react-native";
import ListContainer from "@/components/shared/ListContainer";

export default function RangeDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data: animal, isLoading } = useQuery({
    queryKey: ["animal-range", Number(id)],
    queryFn: () => getAnimalById(Number(id)),
    enabled: !!id,
  });

  const handleUpdatePress = () => {
    router.push(`/workshop/ranges/${id}/update`);
  };

  if (isLoading) {
    return <SpinLoader />;
  }

  const ranges =
    animal &&
    animal.fertility_ranges.map((range) => ({
      ...range,
      min_date: DateService.formatToLongDate(range.min_date, "en"),
      max_date: DateService.formatToLongDate(range.max_date, "en"),
    }));

  return (
    <DetailsLayout imageSource={animal?.image} showUpdateButton={false}>
      <View style={styles.container}>
        <Text>{animal?.name}</Text>
      </View>
      <ListContainer>
        <FlatList
          data={ranges}
          renderItem={({ item }) => (
            <View>
              <Text>{item.min_date}</Text>
              <Text>{item.max_date}</Text>
              <Text>{item.creation_date}</Text>
            </View>
          )}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ flexGrow: 1 }}
          removeClippedSubviews={true}
        />
      </ListContainer>
    </DetailsLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
