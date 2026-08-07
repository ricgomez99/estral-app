import { FieldGroup } from "@expo/ui";
import { FormController } from "../shared/Controllers";
import FormContainer from "../shared/FormContainer";
import { GoogleSignInButton } from "../shared/Buttons";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const { control } = useForm();
  return (
    <FormContainer onSubmit={() => {}}>
      <FieldGroup.Section>
        <FormController
          control={control}
          controllerName="email"
          inputType="input"
          inputPlaceHolder="Email"
          mode="email"
        />

        <FormController
          control={control}
          controllerName="password"
          inputType="input"
          inputPlaceHolder="Password"
        />
      </FieldGroup.Section>
      <FieldGroup.Section>
        <GoogleSignInButton />
      </FieldGroup.Section>
    </FormContainer>
  );
}
