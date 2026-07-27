import { Controller, Control, FieldValues, Path } from "react-hook-form";
import Select from "../Select";
import { OptionType } from "@/types/picker-types";
import { TextInput, Column } from "@expo/ui";
import { useController } from "react-hook-form";
import ErrorText from "../ErrorText";
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
  const {
    fieldState: { error },
  } = useController({
    name: controllerName,
    control,
  });
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
