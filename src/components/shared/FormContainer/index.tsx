import { StyleSheet } from "react-native";
import { FieldValues } from "react-hook-form";
import { Host, FieldGroup } from "@expo/ui";
import { PrimaryButton } from "../Buttons";

interface IFormProps<T extends FieldValues = FieldValues> {
  onSubmit: () => void;
  children: React.ReactNode;
}

export default function FormContainer<T extends FieldValues = FieldValues>({
  children,
  onSubmit,
}: IFormProps<T>) {
  return (
    <Host style={styles.container}>
      <FieldGroup>
        {children}

        <FieldGroup.SectionFooter>
          <PrimaryButton title="Submit" handleClick={onSubmit} />
        </FieldGroup.SectionFooter>
      </FieldGroup>
    </Host>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
