import { FieldGroup } from "@expo/ui";
import { FormController } from "../shared/Controllers";
import FormContainer from "../shared/FormContainer";
import { GoogleSignInButton } from "../shared/Buttons";
import { useForm } from "react-hook-form";
import { AuthService } from "@/services";
import { AuthError } from "@supabase/supabase-js";
import Toast from "react-native-toast-message";
import { LoginFormValues, authSchema } from "@/lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";

interface ILoginProps {
  email: string;
  password: string;
}

export default function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(authSchema),
    mode: "all",
  });
  const submit = async (data: ILoginProps) => {
    if (!data.email || !data.password) return;
    try {
      await AuthService.signInWithEmail(data.email, data.password);
    } catch (error) {
      console.error("Error signing in with Email:", error);

      const isAuthError = error instanceof AuthError;
      const errorMessage =
        error instanceof Error ? error.message : "Unable to sign in with email";

      Toast.show({
        type: "error",
        text1: isAuthError ? "Authentication Error" : "Unexpected Error",
        text2: errorMessage,
      });
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
      <FieldGroup.Section>
        <GoogleSignInButton />
      </FieldGroup.Section>
    </FormContainer>
  );
}
