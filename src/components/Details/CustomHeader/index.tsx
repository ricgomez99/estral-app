import { View, StyleSheet, Text } from "react-native";
import BackButton from "../BackButton/index";

export default function CustomHeader() {
  return (
    <View style={styles.header}>
      <BackButton />
      <Text style={styles.headerTitle}>Details</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 30,
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
});
