import { Pressable, Text, StyleSheet } from "react-native";

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
  return (
    <Pressable
      onPress={handleClick}
      style={[styles.button, { backgroundColor: buttonColor }]}>
      <Text style={styles.buttonTitle}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },

  buttonTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#f9f9f9",
  },
});
