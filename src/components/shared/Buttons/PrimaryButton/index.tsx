import { Button, Text } from "@expo/ui";
import { Dimensions } from "react-native";
interface IPrimaryButtonProps {
  title: string;
  handleClick: () => void;
  type?: "danger" | "normal";
  disable?: boolean;
}

export default function PrimaryButton({
  title,
  handleClick,
  disable = false,
}: IPrimaryButtonProps) {
  const { width } = Dimensions.get("screen");
  return (
    <Button
      style={{ width: width }}
      disabled={disable}
      onPress={handleClick}
      variant="filled">
      <Text>{title}</Text>
    </Button>
  );
}
