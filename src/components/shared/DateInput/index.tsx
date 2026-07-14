import { StyleSheet } from "react-native";
import { Icon, Button, Text, Row } from "@expo/ui";

interface IDateInputProps {
  handlePress: () => void;
  inputText: string | undefined;
  labelText: string | undefined;
}
export default function DateInput({
  handlePress,
  inputText,
  labelText,
}: IDateInputProps) {
  return (
    <Row spacing={16} alignment="center">
      <Text textStyle={styles.label}>{labelText}</Text>
      <Button onPress={handlePress}>
        <Row spacing={6} alignment="center">
          <Icon
            name={Icon.select({
              ios: "calendar",
              android: import("@expo/material-symbols/edit_calendar.xml"),
            })}
            size={24}
          />
          <Text>{inputText}</Text>
        </Row>
      </Button>
    </Row>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
});
