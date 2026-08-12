import { Button, Text } from "@expo/ui";
interface IPrimaryButtonProps {
  title: string;
  handleClick: () => void;
  type?: "danger" | "normal";
  disable?: boolean;
}

export default function PrimaryButton({
  title,
  handleClick,
  type,
  disable = false,
}: IPrimaryButtonProps) {
  return (
    <Button disabled={disable} onPress={handleClick} variant="filled">
      <Text>{title}</Text>
    </Button>
  );
}
