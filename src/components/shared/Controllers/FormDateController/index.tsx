import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { useState } from "react";
import { DateService } from "@/lib";

import DatePickerCustom from "../../DatePickerCustom";
import { Platform } from "react-native";
import { Column } from "@expo/ui";
import DateInput from "../../DateInput";
interface IControllerProps<T extends FieldValues> {
  control: Control<T>;
  controllerName: Path<T>;
  labelText: string | undefined;
}

export default function FormDateController<
  T extends FieldValues = FieldValues,
>({ control, controllerName, labelText }: IControllerProps<T>) {
  const [showDate, setShowDate] = useState(false);
  const handleShowDate = () => {
    setShowDate(!showDate);
  };

  return (
    <Controller
      control={control}
      name={controllerName}
      render={({ field: { onChange, value } }) => {
        const defaultDate =
          typeof value === "string"
            ? (DateService.parseToDate(value) ?? new Date())
            : value || new Date();

        const formattedValue = DateService.formatToStoredDate(defaultDate);

        return Platform.OS === "android" ? (
          <Column>
            <DateInput
              handlePress={handleShowDate}
              inputText={formattedValue}
              labelText={labelText}
            />

            {showDate && (
              <DatePickerCustom
                label={labelText}
                selectedDate={defaultDate}
                onChange={onChange}
                components={"date"}
                variant="input"
              />
            )}
          </Column>
        ) : (
          <DatePickerCustom
            label={labelText}
            selectedDate={defaultDate}
            onChange={onChange}
            components={"date"}
            variant="picker"
          />
        );
      }}
    />
  );
}
