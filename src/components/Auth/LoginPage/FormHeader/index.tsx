import { View, Text, StyleSheet } from "react-native";

export default function FormHeader() {
  const HEADER_TITLE = "Welcome back";
  const HEADER_SUBTITTLE =
    "Let's get you signed in! Please enter your \nemail & password bellow.";

  return (
    <View style={styles.formHeader}>
      <View>
        <Text style={styles.formHeaderTitle}>{HEADER_TITLE}</Text>
      </View>
      <View>
        <Text style={styles.formHeaderSubTitle}>{HEADER_SUBTITTLE}</Text>
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
