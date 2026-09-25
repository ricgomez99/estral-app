import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { useQuery } from "@tanstack/react-query";
import SpinLoader from "@/components/shared/SpinLoader";
import { getReproductiveEventsByAnimalId } from "@/lib/supabase-data-management/data-fetching";

import ListContainer from "@/components/shared/ListContainer";
import { RangeCard } from "@/components/Details";

export default function RangeDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data: reproductiveEvents, isLoading } = useQuery({
    queryKey: ["animal-ranges", id],
    queryFn: async () => await getReproductiveEventsByAnimalId(String(id)),
    enabled: !!id,
  });

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
    <View style={styles.container}>
      <View>
        <Pressable style={styles.createButton} onPress={handleCreatePress}>
          <Text style={styles.createButtonText}>Add new range</Text>
        </Pressable>
      </View>
      <ListContainer>
        <FlatList
          data={reproductiveEvents}
          extraData={reproductiveEvents}
          renderItem={({ item }) => (
            <RangeCard
              max_date={item.max_date}
              min_date={item.min_date}
              creation_date={item.created_at}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
