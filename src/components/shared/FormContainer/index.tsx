import { StyleSheet } from "react-native";
import { Host, FieldGroup } from "@expo/ui";
import { PrimaryButton } from "../Buttons";

interface IFormProps {
  onSubmit: () => void;
  children: React.ReactNode;
  buttonTittle?: string;
}

export default function FormContainer({
  children,
  onSubmit,
  buttonTittle = "Submit",
}: IFormProps) {
  return (
    <Host style={styles.container}>
      <FieldGroup>
        {children}

        <FieldGroup.SectionFooter>
          <PrimaryButton title={buttonTittle} handleClick={onSubmit} />
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
