import { Control, Path, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Switch } from "@expo/ui";

interface IControlllerProps<T extends FieldValues> {
  control: Control<T>;
  controllerName: Path<T>;
  labelText: string | undefined;
  onCustomChange?: (value: boolean) => void;
}
export default function FormSwitchController<
  T extends FieldValues = FieldValues,
>({
  control,
  controllerName,
  labelText,
  onCustomChange,
}: IControlllerProps<T>) {
  return (
    <Controller
      control={control}
      name={controllerName}
      render={({ field: { onChange, value } }) => (
        <Switch
          label={labelText}
          value={value}
          onValueChange={(newValue) => {
            onChange(newValue);
            if (onCustomChange) {
              onCustomChange(newValue);
            }
          }}
        />
      )}
    />
  );
}
