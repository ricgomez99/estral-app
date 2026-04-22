import ListContainer from "@/components/shared/ListContainer";
import { FlatList } from "react-native";
import { DATE_RANGES } from "@/utils/mocks";
import Card from "@/components/shared/Card";
import { useState, useDeferredValue, useMemo } from "react";
import SearchBar from "@/components/shared/SearchBar";
import { IDateRange } from "@/types/mock-types";
import filter from "lodash/filter";
import LinkPressable from "@/components/shared/LinkPressable";

export default function Ranges() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const filteredData = useMemo(() => {
    if (!deferredQuery) return DATE_RANGES;

    return filter(DATE_RANGES, (range: IDateRange) => {
      return range.subject.name
        .toLowerCase()
        .includes(deferredQuery.toLowerCase());
    });
  }, [deferredQuery]);

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
            <LinkPressable href={`/workshop/ranges/${item.id}`}>
              <Card
                cardTitle={item.subject.name}
                cardImage={item.subject.image}
                cardSubTitle="range"
              />
            </LinkPressable>
          )}
          keyExtractor={(item) => String(item.id)}
          removeClippedSubviews={true}
        />
      </ListContainer>
    </>
  );
}
