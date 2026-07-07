import { Controller, Control, FieldValues, Path } from "react-hook-form";
import Select from "../Select";
import { OptionType } from "@/types/picker-types";
import { TextInput } from "@expo/ui";

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
            value={value}
            placeholder={inputPlaceHolder}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        ) : (
          <Select
            options={pickerOptions}
            onChange={onChange}
            value={value}
            placeholder={inputPlaceHolder}
          />
        )
      }
      name={controllerName}
    />
  );
}
