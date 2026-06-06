import { View, Text, StyleSheet } from "react-native";

interface IProps {
  notFoundItems: string;
}

export default function EmptyList({ notFoundItems }: IProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>`${notFoundItems} not found`</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 200,
  },

  text: {
    color: "#bbbb",
    fontFamily: "inherit",
    fontSize: 14,
    fontWeight: "500",
  },
});
