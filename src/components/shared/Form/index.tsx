import { View, StyleSheet } from "react-native";
import { PrimaryButton } from "../Buttons";

interface IFormProps {
  onSubmit: () => void;
  children: React.ReactNode;
  headerTitle?: string;
}

export default function Form({ children, onSubmit, headerTitle }: IFormProps) {
  return (
    <View style={styles.form}>
      <View style={styles.formContent}>
        {/* <View style={styles.formHeader}>
            <Text style={styles.formHeaderTitle}>{headerTitle}</Text>
          </View> */}
        <View style={styles.formContent}>{children}</View>
        <PrimaryButton title="Submit" handleClick={onSubmit} type="normal" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: "100%",
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  formHeader: {
    alignSelf: "flex-start",
    paddingVertical: 5,
  },
  formHeaderTitle: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#2C3947",
  },
  formContent: {
    width: "100%",
    marginBottom: 24,
    gap: 16,
  },
});
