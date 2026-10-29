import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { AuthService } from "@/services";
import { LoginFormValues, authSchema } from "@/lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInError } from "@/helpers/customErrorClasses/sign-in-error";
import { SIGNIN_ERROR_MESSAGES } from "@/utils/consts";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { GoogleSignInButton } from "../shared/Buttons";
import { Link } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ILoginProps {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [hidePassword, setHidePassword] = useState(true);

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

  const toggleShowPassword = () => {
    setHidePassword(!hidePassword);
  };

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
              <View style={loginStyles.inputWrapper}>
                <Text style={loginStyles.inputLabelText}>Email</Text>
                <TextInput
                  style={loginStyles.formInput}
                  inputMode="email"
                  value={value}
                  placeholder="example@gmail.com"
                  placeholderTextColor="#e1e1e1"
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
              <View style={loginStyles.inputWrapper}>
                <Text style={loginStyles.inputLabelText}>Password</Text>
                <View style={loginStyles.formPasswordInputWrapper}>
                  <TextInput
                    style={loginStyles.formPasswordInput}
                    value={value}
                    placeholder="* * * * * * * *"
                    placeholderTextColor="#e1e1e1"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    secureTextEntry={hidePassword}
                  />

                  <MaterialCommunityIcons
                    name={!hidePassword ? "eye-off" : "eye"}
                    size={24}
                    color="#1e1e1e"
                    onPress={toggleShowPassword}
                    style={loginStyles.icon}
                  />
                </View>
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
      <View style={loginStyles.forgotPasswordSection}>
        <Text style={loginStyles.signUpText}>Forgot Password ?</Text>
        <Link href="">
          <Text style={loginStyles.signUpLinkText}>Click here</Text>
        </Link>
      </View>
      {errors.root && (
        <Text style={{ color: "red" }}>{errors.root.message}</Text>
      )}
      <View style={loginStyles.buttonsContainer}>
        <Pressable
          style={loginStyles.signInButton}
          disabled={isSubmitting || !isValid}
          onPress={handleSubmit(submit)}>
          <Text style={loginStyles.signInButtonText}>Sign In</Text>
        </Pressable>
        <View style={loginStyles.buttonsSpearator}>
          <Text style={loginStyles.buttonsSpearatorText}>Or</Text>
        </View>
        <GoogleSignInButton />
      </View>
      <View style={loginStyles.signupSection}>
        <Text style={loginStyles.signUpText}>{"Don't have any account ?"}</Text>
        <Link href={"signup"}>
          <Text style={loginStyles.signUpLinkText}>Signup</Text>
        </Link>
      </View>
    </View>
  );
}

const loginStyles = StyleSheet.create({
  formContainer: {
    flex: 1,
    gap: 20,
  },
  formHeader: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 25,
    textAlign: "center",
  },
  formHeaderTitle: {
    fontSize: 30,
    color: "#1e1e1e",
    fontWeight: "500",
  },
  formHeaderSubTitle: {
    fontSize: 16,
    color: "#B7B7B7",
    fontWeight: "400",
    textAlign: "center",
  },
  formInputsContainer: {
    gap: 20,
  },
  inputWrapper: {
    flexDirection: "column",
    gap: 5,
  },
  inputLabelText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1e1e1e",
  },
  formPasswordInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#e1e1e1",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
  },
  formPasswordInput: {
    flex: 1,
    height: "100%",
    paddingVertical: 0,
    fontSize: 16,
    color: "#1e1e1e",
  },
  formInput: {
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderColor: "#e1e1e1",
    borderRadius: 8,
    borderWidth: 1,

    fontSize: 16,
    color: "#1e1e1e",
  },
  formInputErrorText: {
    color: "#FF0000",
    fontSize: 14,
    fontWeight: "400",
    marginLeft: 10,
  },
  icon: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    gap: 14,
  },
  buttonsSpearator: {
    marginVertical: 2,
  },
  buttonsSpearatorText: {
    color: "#1e1e1e",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
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
    fontSize: 16,
    fontWeight: "600",
  },
  forgotPasswordSection: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 8,
    alignItems: "center",
    marginVertical: 6,
  },
  signupSection: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    alignItems: "center",
  },
  signUpText: {
    color: "#1e1e1e",
    fontSize: 16,
    fontWeight: "500",
  },
  signUpLinkText: {
    color: "#3A86FF",
    fontSize: 16,
    fontWeight: "500",
  },
});
