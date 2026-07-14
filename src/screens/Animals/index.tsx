import { FlatList, Pressable, View, Text, StyleSheet } from "react-native";
import Card from "@/components/shared/Card";
import ListContainer from "@/components/shared/ListContainer";
import SearchBar from "@/components/shared/SearchBar";
import { useState, useMemo, useDeferredValue } from "react";
import filter from "lodash/filter";
import { IAnimal } from "@/types/mock-types";
import LinkPressable from "@/components/shared/LinkPressable";
import useRawAnimalsData from "@/hooks/useRawAnimalsData";
import EmptyList from "@/components/shared/EmptyList";
import SpinLoader from "@/components/shared/SpinLoader";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Animals() {
  const [query, setQuery] = useState("");
  const deferredValue = useDeferredValue(query);
  const router = useRouter();
  const { animals, isLoading, isRefetching, refetch } = useRawAnimalsData();

  const filteredData = useMemo(() => {
    if (!animals) return [];
    if (!deferredValue) return animals;

    return filter(
      animals,
      (animal: IAnimal) =>
        animal.name.toLowerCase().includes(deferredValue.toLowerCase()) ||
        animal.type.toLowerCase().includes(deferredValue.toLowerCase()),
    );
  }, [deferredValue, animals]);

  const handleChange = (newText: string) => {
    setQuery(newText);
  };

  const handleCreatePress = () => {
    router.push({
      pathname: "/workshop/animals/create",
    });
  };

  if (isLoading) {
    return <SpinLoader />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar value={query} handleChange={handleChange} />
      <View>
        <Pressable style={styles.createButton} onPress={handleCreatePress}>
          <Text style={styles.createButtonText}>Register Animal</Text>
        </Pressable>
      </View>
      <ListContainer>
        <FlatList
          data={filteredData}
          renderItem={({ item }) => (
            <LinkPressable href={`/workshop/animals/${item.id}`}>
              <Card
                cardTitle={item.name}
                cardImage={item.image}
                cardSubTitle={item.type}
              />
            </LinkPressable>
          )}
          keyExtractor={(item) => item.id.toString()}
          refreshing={isRefetching}
          onRefresh={refetch}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
          ListEmptyComponent={<EmptyList notFoundItems="Animals" />}
          removeClippedSubviews={true}
        />
      </ListContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 6,
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
