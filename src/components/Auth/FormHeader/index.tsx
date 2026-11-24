import { View, Text, StyleSheet } from "react-native";

interface IProps {
  headerTitle: string;
  headerSubtitle: string;
}

export default function FormHeader({ headerTitle, headerSubtitle }: IProps) {
  return (
    <View style={styles.formHeader}>
      <View>
        <Text style={styles.formHeaderTitle}>{headerTitle}</Text>
      </View>
      <View>
        <Text style={styles.formHeaderSubTitle}>{headerSubtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formHeader: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 25,
    textAlign: "center",
  },
  formHeaderTitle: {
    fontSize: 30,
    color: "#1e1e1e",
    fontWeight: "500",
  },
  formHeaderSubTitle: {
    fontSize: 16,
    color: "#B7B7B7",
    fontWeight: "400",
    textAlign: "center",
  },
});
