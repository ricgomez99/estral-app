import { useForm } from "react-hook-form";
import { AuthService } from "@/services";
import { LoginFormValues, authSchema } from "@/lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInError } from "@/helpers/customErrorClasses/sign-in-error";
import { SIGNIN_ERROR_MESSAGES } from "@/utils/consts";
import { View, StyleSheet } from "react-native";
import FormHeader from "../Auth/FormHeader";
import ErrorText from "../Auth/ErrorText";
import HeadToLink from "../Auth/HeadToLink";
import FormFooter from "../Auth/LoginPage/FormFooter";
import RegularInput from "../Auth/Inputs/RegularInput";
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

  const HEADER_TITLE = "Welcome back";
  const HEADER_SUBTITTLE =
    "Let's get you signed in! Please enter your \nemail & password bellow.";

  return (
    <View style={loginStyles.formContainer}>
      <FormHeader
        headerTitle={HEADER_TITLE}
        headerSubtitle={HEADER_SUBTITTLE}
      />
      <View style={loginStyles.formInputsContainer}>
        <RegularInput
          control={control}
          controllerName="email"
          label="Email"
          type="email"
          placeHolder="example@gmail.com"
        />
        <PasswordInput control={control} controllerName="password" />
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
