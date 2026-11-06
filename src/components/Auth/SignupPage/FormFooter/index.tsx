import { View, Pressable, StyleSheet, Text } from "react-native";

interface IProps {
  shouldDisable: boolean;
  onSubmit: () => void;
}

export default function FormFooter({ shouldDisable, onSubmit }: IProps) {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.signUpButton}
        disabled={shouldDisable}
        onPress={onSubmit}>
        <Text style={styles.signUpButtonText}>Create account</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 14,
  },

  signUpButton: {
    backgroundColor: "#3A86FF",
    paddingHorizontal: 12,
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  signUpButtonText: {
    color: "#f9f9f9",
    fontSize: 16,
    fontWeight: "600",
  },
});
