import { useForm, Controller } from "react-hook-form";
import { AuthService } from "@/services";
import { LoginFormValues, authSchema } from "@/lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInError } from "@/helpers/customErrorClasses/sign-in-error";
import { SIGNIN_ERROR_MESSAGES } from "@/utils/consts";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";
import { GoogleSignInButton } from "../shared/Buttons";

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
  const { width } = Dimensions.get("screen");
  return (
    <View style={loginStyles.formContainer}>
      <View style={loginStyles.formHeader}>
        <View>
          <Text style={loginStyles.formHeaderTitle}>Welcome back</Text>
        </View>
        <View>
          <Text style={loginStyles.formHeaderSubTitle}>
            {
              "Let's get you signed in! Please enter your \nemail & password bellow."
            }
          </Text>
        </View>
      </View>
      <View style={loginStyles.formInputsContainer}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <View>
                <TextInput
                  style={loginStyles.formInput}
                  inputMode="email"
                  value={value}
                  placeholder="example@gmail.com"
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
                {errors.email && (
                  <Text style={loginStyles.formInputErrorText}>
                    {errors.email.message}
                  </Text>
                )}
              </View>
            );
          }}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <View>
                <TextInput
                  style={[loginStyles.formInput, { width: width }]}
                  value={value}
                  placeholder="* * * * * * * *"
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
                {errors.password && (
                  <Text style={loginStyles.formInputErrorText}>
                    {errors.password.message}
                  </Text>
                )}
              </View>
            );
          }}
        />
      </View>
      <View style={loginStyles.buttonsContainer}>
        <Pressable
          style={[loginStyles.signInButton, { width: width }]}
          disabled={isSubmitting || !isValid}
          onPress={handleSubmit(submit)}>
          <Text style={loginStyles.signInButtonText}>Sign In</Text>
        </Pressable>
        <GoogleSignInButton />
      </View>
      {errors.root && (
        <Text style={{ color: "red" }}>{errors.root.message}</Text>
      )}
    </View>
  );
}

const loginStyles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 12,
    gap: 40,
  },
  formHeader: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    textAlign: "center",
  },
  formHeaderTitle: {
    fontSize: 28,
    color: "#1e1e1e",
    fontWeight: "500",
  },
  formHeaderSubTitle: {
    fontSize: 14,
    color: "#bbbb",
    fontWeight: "400",
    textAlign: "center",
  },
  formInputsContainer: {
    gap: 20,
  },
  formInput: {
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderColor: "#e1e1e1",
    borderRadius: 8,
    borderWidth: 1,
  },
  formInputErrorText: {
    color: "#FF0000",
    fontSize: 14,
    fontWeight: "400",
    marginLeft: 10,
    marginVertical: 5,
  },
  buttonsContainer: {
    gap: 20,
  },
  signInButton: {
    backgroundColor: "#3A86FF",
    paddingHorizontal: 12,
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  signInButtonText: {
    color: "#f9f9f9",
    fontSize: 14,
    fontWeight: "600",
  },
});
