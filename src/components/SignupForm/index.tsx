import { View, StyleSheet } from "react-native";
import RegularInput from "../Auth/Inputs/RegularInput";
import PasswordInput from "../Auth/Inputs/Password";
import { useForm } from "react-hook-form";
import {
  RegisterInput,
  RegisterOutput,
  registerSchema,
} from "@/lib/zod-schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormHeader from "../Auth/FormHeader";
import FormFooter from "../Auth/SignupPage/FormFooter";
import ErrorText from "../Auth/ErrorText";
import HeadToLink from "../Auth/HeadToLink";
import { useRouter } from "expo-router";
import { SignUpError } from "@/helpers/customErrorClasses/signup-error";
import { SIGN_UP_ERROR_MESSAGES } from "@/utils/consts";
import { AuthService } from "@/services/auth/auth-service";

export default function SignupForm() {
  const {
    control,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput, unknown, RegisterOutput>({
    resolver: zodResolver(registerSchema),
    defaultValues: undefined,
    mode: "onChange",
  });

  const { replace } = useRouter();
  const HEADER_TITLE = "Create account";
  const HEADER_SUBTITLE = "Start managing your horse's\n estrus cycles now!";

  const submit = async (data: RegisterOutput) => {
    clearErrors("root");
    try {
      const { email, password, full_name } = data;

      const { session } = await AuthService.signUp(email, password, full_name);

      if (!session) {
        replace({ pathname: "/check-email", params: { email } });
        return;
      }

      replace("/onboarding");
    } catch (error) {
      console.error(error);

      if (!(error instanceof SignUpError)) {
        setError("root", { message: SIGN_UP_ERROR_MESSAGES.unknown });
        return;
      }

      if (error.kind === "user_already_exists") {
        setError("email", { message: error.message });
      } else {
        setError("root", { message: error.message });
      }
    }
  };

  return (
    <View style={styles.formContainer}>
      <FormHeader headerTitle={HEADER_TITLE} headerSubtitle={HEADER_SUBTITLE} />
      <View style={styles.formInputsContainer}>
        <RegularInput
          control={control}
          controllerName="full_name"
          label="Name"
          type="text"
          placeHolder="John Doe"
        />
        <RegularInput
          control={control}
          controllerName="email"
          label="Email"
          type="email"
          placeHolder="example@gmail.com"
        />
        <PasswordInput
          control={control}
          controllerName="password"
          label="Create Password"
        />
      </View>
      {errors.root && <ErrorText errorMessage={errors.root.message} />}
      <FormFooter
        shouldDisable={isSubmitting}
        onSubmit={handleSubmit(submit)}
      />
      <HeadToLink
        mainText="Already have an account ?"
        linkText="Log in"
        linkUrl="login"
        alignment="center"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    gap: 20,
  },
  formInputsContainer: {
    gap: 20,
  },
});
