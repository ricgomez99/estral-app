import { View, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native";

export default function SpinLoader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
