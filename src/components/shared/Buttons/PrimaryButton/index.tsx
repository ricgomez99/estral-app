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
