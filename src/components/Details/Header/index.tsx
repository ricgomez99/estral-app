import { View, Text, StyleSheet } from "react-native";
import Batch from "@/components/shared/Batch";

interface IHeaderProps {
  title: string | undefined;
  badgeText: string | undefined;
}

export default function Header({ title, badgeText }: IHeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <Batch text={badgeText} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A1A1A",
  },
});
