import { View, Text, StyleSheet } from "react-native";

interface IGridItemProps {
  label: boolean;
  labelText?: string | undefined;
  children: React.ReactNode;
}

export default function GridItem({
  label,
  labelText,
  children,
}: IGridItemProps) {
  const formatedLabel =
    labelText?.length || labelText != undefined ? `${labelText}: ` : null;
  return (
    <View style={styles.gridItem}>
      {label && <Text style={styles.label}>{formatedLabel}</Text>}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  gridItem: {
    width: "50%",
    paddingVertical: 8,
    marginBottom: 8,
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
  },
});
