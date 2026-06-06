import ListContainer from "@/components/shared/ListContainer";
import { FlatList } from "react-native";
import { DATE_RANGES } from "@/utils/mocks";
import Card from "@/components/shared/Card";
import { useState, useDeferredValue, useMemo } from "react";
import SearchBar from "@/components/shared/SearchBar";
import { IDateRange } from "@/types/mock-types";
import filter from "lodash/filter";
import LinkPressable from "@/components/shared/LinkPressable";
import useTabQuery from "@/hooks/useTabQuery";
import { getRanges } from "@/utils/mock-functions";
import EmptyList from "@/components/shared/EmptyList";
import SpinLoader from "@/components/shared/SpinLoader";

export default function Ranges() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const {
    data: ranges,
    isLoading,
    isRefetching,
    refetch,
    error,
  } = useTabQuery<IDateRange[]>({
    queryKey: ["ranges"],
    queryFn: getRanges,
  });

  const filteredData = useMemo(() => {
    if (!ranges) return [];
    if (!deferredQuery) return ranges;

    return filter(ranges, (range: IDateRange) => {
      return range.subject.name
        .toLowerCase()
        .includes(deferredQuery.toLowerCase());
    });
  }, [deferredQuery, ranges]);

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
                cardTitle={item.subject.name}
                cardImage={item.subject.image}
                cardSubTitle="range"
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
