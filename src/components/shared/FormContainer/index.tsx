import { StyleSheet } from "react-native";
import {
  FieldValues,
  SubmitErrorHandler,
  UseFormHandleSubmit,
} from "react-hook-form";
import { Host, FieldGroup } from "@expo/ui";
import { PrimaryButton } from "../Buttons";

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
    <Host style={styles.container}>
      <FieldGroup>
        {children}
        <FieldGroup.Section>
          <PrimaryButton
            title="Submit"
            handleClick={handleSubmit(onSubmit, onError)}
          />
        </FieldGroup.Section>
      </FieldGroup>
    </Host>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fieldGroup: {
    flex: 1,
  },
});
