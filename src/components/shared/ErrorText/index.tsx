import { Text } from "@expo/ui";
import { StyleSheet } from "react-native";

interface IErrorTextProps {
  message: string | undefined;
}

export default function ErrorText({ message }: IErrorTextProps) {
  return (
    <Text textStyle={styles.textMessage} style={{ paddingVertical: 5 }}>
      {message}
    </Text>
  );
}

const styles = StyleSheet.create({
  textMessage: {
    color: "red",
    fontSize: 14,
    fontWeight: "500",
  },
});
