import { View, Text, StyleSheet } from "react-native";
import { PrimaryButton } from "../Buttons";

interface IFormProps {
  onSubmit: () => void;
  children: React.ReactNode;
  headerTitle?: string;
}

export default function Form({ children, onSubmit, headerTitle }: IFormProps) {
  return (
    <View style={styles.form}>
      <View style={styles.formHeader}>
        <Text style={styles.formHeaderTitle}>{headerTitle}</Text>
      </View>
      <View style={styles.formContent}>{children}</View>
      <PrimaryButton title="Submit" handleClick={onSubmit} type="normal" />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    gap: 16,
    flex: 1,
  },
  formHeader: {
    alignSelf: "flex-start",
    paddingVertical: 5,
    justifyContent: "space-between",
  },
  formHeaderTitle: {
    fontFamily: "inherit",
    fontWeight: "bold",
    fontSize: 24,
    color: "#2C3947",
  },
  formContent: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
});
