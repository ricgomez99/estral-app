import { Picker, Text, Spacer, Column } from "@expo/ui";
import { Control, FieldValues, Path, Controller } from "react-hook-form";

interface IProps<T extends FieldValues> {
  control: Control<T>;
  controlName: Path<T>;
  pickerOptions: IPickerOption[];
  pickerLabel: string;
}

interface IPickerOption {
  label: string;
  value: string;
}

export default function PickerInput<T extends FieldValues = FieldValues>({
  control,
  controlName,
  pickerOptions,
  pickerLabel,
}: IProps<T>) {
  return (
    <Controller
      control={control}
      name={controlName}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <Column spacing={8} alignment="start">
            <Text>{pickerLabel}</Text>
            <Spacer flexible />
            <Picker selectedValue={value} onValueChange={onChange}>
              {pickerOptions.map((option) => (
                <Picker.Item
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
            {error && (
              <Text
                textStyle={{
                  color: "#FF0000",
                  fontSize: 14,
                  fontWeight: "400",
                }}>
                {error?.message}
              </Text>
            )}
          </Column>
        );
      }}
    />
  );
}
