import { FlatList } from "react-native";
import { ANIMALS } from "@/utils/mocks";
import Card from "@/components/shared/Card";
import ListContainer from "@/components/shared/ListContainer";
import SearchBar from "@/components/shared/SearchBar";
import { useState, useMemo, useDeferredValue } from "react";
import filter from "lodash/filter";
import { IAnimal } from "@/types/mock-types";
import LinkPressable from "@/components/shared/LinkPressable";

export default function Animals() {
  const [query, setQuery] = useState("");
  const deferredValue = useDeferredValue(query);

  const filteredData = useMemo(() => {
    if (!deferredValue) return ANIMALS;

    return filter(
      ANIMALS,
      (animal: IAnimal) =>
        animal.name.toLowerCase().includes(deferredValue.toLowerCase()) ||
        animal.type.toLowerCase().includes(deferredValue.toLowerCase()),
    );
  }, [deferredValue]);

  const handleChange = (newText: string) => {
    setQuery(newText);
  };

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
          keyExtractor={(item) => String(item.id)}
        />
      </ListContainer>
    </>
  );
}
