import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, StatusBar } from "react-native";

interface ListProps {
  children: React.ReactNode;
}

export default function ListContainer({ children }: ListProps) {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});
