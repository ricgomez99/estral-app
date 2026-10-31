import { Text, StyleSheet } from "react-native";

interface IProps {
  errorMessage: string | undefined;
}

export default function ErrorText({ errorMessage }: IProps) {
  return <Text style={styles.formInputErrorText}>{errorMessage}</Text>;
}

const styles = StyleSheet.create({
  formInputErrorText: {
    color: "#FF0000",
    fontSize: 14,
    fontWeight: "400",
    marginLeft: 10,
  },
});
