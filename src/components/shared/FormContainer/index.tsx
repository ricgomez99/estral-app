import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
} from "react-native";
import { PrimaryButton } from "../Buttons";
import {
  FieldValues,
  SubmitErrorHandler,
  UseFormHandleSubmit,
} from "react-hook-form";

interface IFormProps<T extends FieldValues = FieldValues> {
  onSubmit: (data: any) => void;
  onError?: SubmitErrorHandler<T>;
  children: React.ReactNode;
  handleSubmit: UseFormHandleSubmit<T>;
}

export default function FormContainer<T extends FieldValues = FieldValues>({
  handleSubmit,
  children,
  onSubmit,
  onError,
}: IFormProps<T>) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContent}>
          {children}
          <PrimaryButton
            title="Submit"
            handleClick={handleSubmit(onSubmit, onError)}
            type="normal"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
  },
  formContent: {
    gap: 16,
  },
});
