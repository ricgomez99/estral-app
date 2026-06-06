import { Text, View, StyleSheet } from "react-native";

interface IChipProps {
  chipText: string;
  active: boolean | undefined;
}

export default function Chip({ chipText, active }: IChipProps) {
  const backgroundColor = active ? "#9AD872" : "#162E93";
  return (
    <View
      style={[
        styles.chip,
        { backgroundColor: backgroundColor, borderColor: backgroundColor },
      ]}>
      <Text style={styles.chipText}>{chipText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    width: "auto",
    maxWidth: 100,
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: 8,
    paddingInline: 12,
  },

  chipText: {
    color: "#f9f9f9",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
});
