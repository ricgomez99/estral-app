import { FlatList } from "react-native";
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

export default function Animals() {
  const [query, setQuery] = useState("");
  const deferredValue = useDeferredValue(query);
  const { animals, isLoading, error, isRefetching, refetch } =
    useRawAnimalsData();

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

  if (isLoading) {
    return <SpinLoader />;
  }

  return (
    <>
      <SearchBar value={query} handleChange={handleChange} />

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
          keyExtractor={(item) => item.id as string}
          refreshing={isRefetching}
          onRefresh={refetch}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={<EmptyList notFoundItems="Animals" />}
          removeClippedSubviews={true}
        />
      </ListContainer>
    </>
  );
}
