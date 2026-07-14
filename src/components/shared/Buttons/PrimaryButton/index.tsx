import { StyleSheet } from "react-native";
import { Button, Text } from "@expo/ui";
interface IPrimaryButtonProps {
  title: string;
  handleClick: () => void;
  type?: "danger" | "normal";
}

export default function PrimaryButton({
  title,
  handleClick,
  type,
}: IPrimaryButtonProps) {
  const buttonColor = type === "danger" ? "#E03F4F" : "#093C5D";
  return (
    <Button onPress={handleClick} variant="filled">
      <Text>{title}</Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#f9f9f9",
  },
});
