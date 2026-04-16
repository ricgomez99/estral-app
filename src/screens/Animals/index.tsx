import { FlatList, StyleSheet, StatusBar } from "react-native";
import { ANIMALS } from "@/utils/mocks";
import Card from "@/components/shared/Card";
import ListContainer from "../../components/shared/ListContainer";

export default function Animals() {
  return (
    <ListContainer>
      <FlatList
        data={ANIMALS}
        renderItem={({ item }) => (
          <Card
            cardTitle={item.name}
            cardImage={item.image}
            cardSubTitle={item.type}
          />
        )}
        keyExtractor={(item) => String(item.id)}
      />
    </ListContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});
