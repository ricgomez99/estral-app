import { FieldGroup, Text } from "@expo/ui";
import { FormController } from "../shared/Controllers";
import FormContainer from "../shared/FormContainer";
import { GoogleSignInButton } from "../shared/Buttons";
import { useForm } from "react-hook-form";
import { AuthService } from "@/services";
import { LoginFormValues, authSchema } from "@/lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInError } from "@/helpers/customErrorClasses/sign-in-error";
import { SIGNIN_ERROR_MESSAGES } from "@/utils/consts";

interface ILoginProps {
  email: string;
  password: string;
}

export default function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setError,
    clearErrors,
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: undefined,
      password: undefined,
    },
    resolver: zodResolver(authSchema),
    mode: "onChange",
  });
  const submit = async (data: ILoginProps) => {
    if (!data.email || !data.password) return;
    clearErrors("root");
    try {
      await AuthService.signInWithEmail(data.email, data.password);
    } catch (error) {
      console.error("Error signing in with Email:", error);
      const message =
        error instanceof SignInError
          ? error.message
          : SIGNIN_ERROR_MESSAGES.unknown;

      setError("root", { message });
    }
  };
  return (
    <FormContainer
      onSubmit={handleSubmit(submit)}
      disableButton={isSubmitting || !isValid}>
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
          secureText={true}
        />
      </FieldGroup.Section>
      {errors.root && (
        <FieldGroup.Section>
          <Text textStyle={{ color: "red" }}>{errors.root.message}</Text>
        </FieldGroup.Section>
      )}
      <FieldGroup.Section>
        <GoogleSignInButton />
      </FieldGroup.Section>
    </FormContainer>
  );
}
