import { Button } from "react-native";

interface IPrimaryButtonProps {
  title: string;
  handleClick: () => void;
  type: "danger" | "normal";
}

export default function PrimaryButton({
  title,
  handleClick,
  type,
}: IPrimaryButtonProps) {
  const buttonColor = type === "danger" ? "#E03F4F" : "#093C5D";
  return <Button title={title} onPress={handleClick} color={buttonColor} />;
}
