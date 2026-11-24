import {
  View,
  TextInput,
  Text,
  StyleSheet,
  InputModeOptions,
} from "react-native";
import ErrorText from "../../ErrorText";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface IProps<T extends FieldValues> {
  control: Control<T>;
  controllerName: Path<T>;
  label: string;
  type: InputModeOptions;
  placeHolder: string;
}

export default function RegularInput<T extends FieldValues = FieldValues>({
  control,
  controllerName,
  label,
  type,
  placeHolder,
}: IProps<T>) {
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
            <TextInput
              style={styles.formInput}
              inputMode={type}
              value={value}
              placeholder={placeHolder}
              placeholderTextColor="#e1e1e1"
              onBlur={onBlur}
              onChangeText={onChange}
            />

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
