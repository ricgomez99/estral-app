import { StyleSheet, View } from "react-native";

interface ListProps {
  children: React.ReactNode;
}

export default function ListContainer({ children }: ListProps) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },
});
