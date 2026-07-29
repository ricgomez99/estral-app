import { View, Text, StyleSheet } from "react-native";

interface ILabeldTextProps {
  labelTitle: string;
  text: string | number | undefined;
  disposition: "vertical" | "horizontal";
}

export default function LabeldText({
  labelTitle,
  text,
  disposition,
}: ILabeldTextProps) {
  const directionType = disposition === "horizontal" ? "row" : "column";
  return (
    <View style={[{ flexDirection: directionType }, styles.wrapper]}>
      <Text style={styles.label}>{labelTitle}:</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
  },
});
