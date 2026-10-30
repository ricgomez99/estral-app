import { useForm } from "react-hook-form";
import { AuthService } from "@/services";
import { LoginFormValues, authSchema } from "@/lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInError } from "@/helpers/customErrorClasses/sign-in-error";
import { SIGNIN_ERROR_MESSAGES } from "@/utils/consts";
import { View, StyleSheet } from "react-native";
import FormHeader from "../Auth/LoginPage/FormHeader";
import ErrorText from "../Auth/ErrorText";
import HeadToLink from "../Auth/HeadToLink";
import FormFooter from "../Auth/LoginPage/FormFooter";
import EmailInput from "../Auth/Inputs/Email";
import PasswordInput from "../Auth/Inputs/Password";

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
    <View style={loginStyles.formContainer}>
      <FormHeader />
      <View style={loginStyles.formInputsContainer}>
        <EmailInput control={control} controllerName="email" errors={errors} />
        <PasswordInput
          control={control}
          controllerName="password"
          errors={errors}
        />
      </View>
      <HeadToLink
        mainText="Forgot Password ?"
        linkText="Click here"
        linkUrl=""
        alignment="start"
      />
      {errors.root && <ErrorText errorMessage={errors.root.message} />}

      <FormFooter
        shouldDisable={isSubmitting || !isValid}
        onSubmit={handleSubmit(submit)}
      />

      <HeadToLink
        mainText="Don't have any account ?"
        linkText="Signup"
        linkUrl="signup"
        alignment="center"
      />
    </View>
  );
}

const loginStyles = StyleSheet.create({
  formContainer: {
    flex: 1,
    gap: 20,
  },
  formInputsContainer: {
    gap: 20,
  },
});
