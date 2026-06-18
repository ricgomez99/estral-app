import { View, Text, Pressable, StyleSheet } from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";

interface IDateInputProps {
  children: React.ReactNode;
  handlePress: () => void;
  inputText: string | undefined;
  addLabel?: boolean;
  labelText?: string | undefined | null;
}
export default function DateInput({
  children,
  handlePress,
  inputText,
  addLabel = false,
  labelText = null,
}: IDateInputProps) {
  return (
    <View style={styles.container}>
      {addLabel && <Text style={styles.label}>{labelText}</Text>}
      <Pressable onPress={handlePress} style={styles.fakeInput}>
        <Fontisto name="date" size={24} color="black" />
        <Text style={styles.inputText}>{inputText}</Text>
      </Pressable>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    flex: 1,
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  fakeInput: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 12,
    justifyContent: "center",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  inputText: {
    fontSize: 16,
    color: "#7c7c7cbb",
  },
});
