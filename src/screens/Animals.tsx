import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { FlatList, StyleSheet, StatusBar } from "react-native";
import { ANIMALS } from "@/utils/mocks";
import Card from "@/components/Card";

export default function Animals() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={ANIMALS}
          renderItem={({ item }) => (
            <Card name={item.name} image={item.image} type={item.type} />
          )}
          keyExtractor={(item) => String(item.id)}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});
