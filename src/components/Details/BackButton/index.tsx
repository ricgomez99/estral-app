import { Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function BackButton() {
  const router = useRouter();
  const handlePress = () => {
    router.back();
  };
  return (
    <Pressable style={styles.backButton} onPress={handlePress}>
      <Ionicons name="chevron-back" size={24} color="#007AFF" />
      <Text style={styles.buttonText}>Go Back</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    width: 80,
  },

  buttonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
