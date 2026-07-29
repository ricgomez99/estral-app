import { Controller, Control, FieldValues, Path } from "react-hook-form";
import Select from "../../Select";
import { OptionType } from "@/types/picker-types";
import { TextInput, Column } from "@expo/ui";
import ErrorText from "../../ErrorText";
interface IControllerProps<T extends FieldValues> {
  control: Control<T>;
  controllerName: Path<T>;
  inputPlaceHolder: string | undefined;
  inputType: "input" | "picker";
  pickerOptions?: OptionType[];
  mode?: "text" | "numeric";
}

export default function FormController<T extends FieldValues = FieldValues>({
  control,
  controllerName,
  inputPlaceHolder,
  inputType,
  pickerOptions,
  mode = "text",
}: IControllerProps<T>) {
  return (
    <Controller
      control={control}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) =>
        inputType === "input" ? (
          <Column>
            <TextInput
              value={value}
              placeholder={inputPlaceHolder}
              onChangeText={onChange}
              onBlur={onBlur}
              inputMode={mode}
            />
            {error && <ErrorText message={error.message} />}
          </Column>
        ) : (
          <Column>
            <Select
              options={pickerOptions}
              onChange={onChange}
              value={value}
              placeholder={inputPlaceHolder}
            />
            {error && <ErrorText message={error.message} />}
          </Column>
        )
      }
      name={controllerName}
    />
  );
}
