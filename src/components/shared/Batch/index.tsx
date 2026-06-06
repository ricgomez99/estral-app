import { View, Text, StyleSheet } from "react-native";

interface IBatchProps {
  text: string | undefined;
}

export default function Batch({ text }: IBatchProps) {
  const cleanText = text?.toUpperCase().trim();
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{cleanText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#777",
  },
});
