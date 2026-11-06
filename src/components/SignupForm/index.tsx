import { View, StyleSheet } from "react-native";
import RegularInput from "../Auth/Inputs/RegularInput";
import PasswordInput from "../Auth/Inputs/Password";
import { useForm } from "react-hook-form";
import {
  RegisterInput,
  RegisterOutput,
  registerSchema,
} from "@/lib/zod-schemas/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormHeader from "../Auth/FormHeader";
import FormFooter from "../Auth/SignupPage/FormFooter";
import ErrorText from "../Auth/ErrorText";
import HeadToLink from "../Auth/HeadToLink";

export default function SignupForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RegisterInput, unknown, RegisterOutput>({
    resolver: zodResolver(registerSchema),
    defaultValues: undefined,
    mode: "onChange",
  });

  const HEADER_TITLE = "Create account";
  const HEADER_SUBTITLE = "Start managing your horse's\n estrus cycles now!";

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
        shouldDisable={isSubmitting || !isValid}
        onSubmit={() => {}}
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
