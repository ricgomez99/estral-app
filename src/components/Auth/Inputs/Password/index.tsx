import { View, TextInput, Text, StyleSheet } from "react-native";
import ErrorText from "../../ErrorText";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";

interface IProps<T extends FieldValues> {
  control: Control<T>;
  controllerName: Path<T>;
  label?: string;
}

export default function PasswordInput<T extends FieldValues = FieldValues>({
  control,
  controllerName,
  label = "Password",
}: IProps<T>) {
  const [hidePassword, setHidePassword] = useState(true);

  const toggleShowPassword = () => {
    setHidePassword(!hidePassword);
  };
  return (
    <Controller
      control={control}
      name={controllerName}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => {
        return (
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabelText}>{label}</Text>
            <View style={styles.passwordInputWrapper}>
              <TextInput
                style={styles.passwordInput}
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
                style={styles.icon}
              />
            </View>
            {error && <ErrorText errorMessage={error.message} />}
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "column",
    gap: 5,
  },
  inputLabelText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1e1e1e",
  },

  passwordInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#e1e1e1",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
  },
  passwordInput: {
    flex: 1,
    height: "100%",
    paddingVertical: 0,
    fontSize: 16,
    color: "#1e1e1e",
  },
  icon: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
