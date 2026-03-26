import ListContainer from "@/components/shared/ListContainer";
import { FlatList } from "react-native";
import { DATE_RANGES } from "@/utils/mocks";
import Card from "@/components/shared/Card";

export default function Ranges() {
  return (
    <ListContainer>
      <FlatList
        data={DATE_RANGES}
        renderItem={({ item }) => (
          <Card
            cardTitle={item.subject.name}
            cardImage={item.subject.image}
            cardSubTitle="range"
          />
        )}
        keyExtractor={(item) => String(item.id)}
      />
    </ListContainer>
  );
}
