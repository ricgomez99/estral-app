import ListContainer from "@/components/shared/ListContainer";
import { FlatList } from "react-native";
import Card from "@/components/shared/Card";
import { useState, useDeferredValue, useMemo } from "react";
import SearchBar from "@/components/shared/SearchBar";
import filter from "lodash/filter";
import LinkPressable from "@/components/shared/LinkPressable";
import { IAnimal } from "@/types/mock-types";
import EmptyList from "@/components/shared/EmptyList";
import SpinLoader from "@/components/shared/SpinLoader";
import useRawAnimalsData from "@/hooks/useRawAnimalsData";

export default function Ranges() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const { animals, isLoading, isRefetching, refetch, error } =
    useRawAnimalsData();

  const filteredData = useMemo(() => {
    if (!animals) return [];
    if (!deferredQuery) return animals;

    return filter(animals, (animal: IAnimal) => {
      const name = animal?.name
        .toLowerCase()
        .includes(deferredQuery.toLowerCase());
      return name;
    });
  }, [deferredQuery, animals]);

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
            <LinkPressable href={`/workshop/ranges/${item.id}`}>
              <Card
                cardTitle={item.name}
                cardImage={item.image}
                cardSubTitle={`ranges: ${item.fertility_ranges.length}`}
              />
            </LinkPressable>
          )}
          keyExtractor={(item) => String(item.id)}
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
