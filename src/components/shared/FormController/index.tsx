import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { TextInput, StyleSheet } from "react-native";
import Select from "../Select";
import { OptionType } from "@/types/picker-types";

interface IControllerProps<T extends FieldValues> {
  control: Control<T>;
  controllerName: Path<T>;
  inputPlaceHolder: string | undefined;
  inputType: "input" | "picker";
  pickerOptions?: OptionType[];
}

export default function FormController<T extends FieldValues = FieldValues>({
  control,
  controllerName,
  inputPlaceHolder,
  inputType,
  pickerOptions,
}: IControllerProps<T>) {
  return (
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) =>
        inputType === "input" ? (
          <TextInput
            placeholder={inputPlaceHolder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value.toString()}
            style={styles.input}
          />
        ) : (
          <Select options={pickerOptions} onChange={onChange} value={value} />
        )
      }
      name={controllerName}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#BBBB",
    borderRadius: 8,
    width: "100%",
  },
});
