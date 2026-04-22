import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function AnimalDetails() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>{id}</Text>
    </View>
  );
}
