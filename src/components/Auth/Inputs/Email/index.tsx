import { View, TextInput, Text, StyleSheet } from "react-native";
import ErrorText from "../../ErrorText";
import {
  Control,
  Controller,
  FieldValues,
  FieldErrors,
  Path,
} from "react-hook-form";
import { LoginFormValues } from "@/lib/zod-schemas";

interface IProps<T extends FieldValues> {
  control: Control<T>;
  controllerName: Path<T>;
  errors: FieldErrors<LoginFormValues>;
}

export default function EmailInput<T extends FieldValues = FieldValues>({
  control,
  controllerName,
  errors,
}: IProps<T>) {
  return (
    <Controller
      control={control}
      name={controllerName}
      render={({ field: { onChange, onBlur, value } }) => {
        return (
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabelText}>Email</Text>
            <TextInput
              style={styles.formInput}
              inputMode="email"
              value={value}
              placeholder="example@gmail.com"
              placeholderTextColor="#e1e1e1"
              onBlur={onBlur}
              onChangeText={onChange}
            />

            {errors.email && <ErrorText errorMessage={errors.email.message} />}
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
});
