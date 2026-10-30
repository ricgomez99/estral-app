import { GoogleSignInButton } from "@/components/shared/Buttons";
import { View, StyleSheet, Text, Pressable } from "react-native";

interface IProps {
  shouldDisable: boolean;
  onSubmit: () => void;
}

export default function FormFooter({ shouldDisable, onSubmit }: IProps) {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.signInButton}
        disabled={shouldDisable}
        onPress={onSubmit}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </Pressable>
      <View style={styles.buttonsSpearator}>
        <Text style={styles.buttonsSpearatorText}>Or</Text>
      </View>
      <GoogleSignInButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 14,
  },
  buttonsSpearator: {
    marginVertical: 2,
  },
  buttonsSpearatorText: {
    color: "#1e1e1e",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  signInButton: {
    backgroundColor: "#3A86FF",
    paddingHorizontal: 12,
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  signInButtonText: {
    color: "#f9f9f9",
    fontSize: 16,
    fontWeight: "600",
  },
});
