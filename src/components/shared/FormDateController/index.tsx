import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Platform } from "react-native";
import { useState } from "react";
import { DateService } from "@/lib";
import DateTimePicker, {
  DateTimePickerChangeEvent,
} from "@expo/ui/community/datetime-picker";
import DateInput from "../DateInput";
import { Column } from "@expo/ui";
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
    setShowDate(true);
  };

  return (
    <Controller
      control={control}
      render={({ field: { onChange, value } }) => {
        const defaultDate =
          typeof value === "string"
            ? (DateService.parseToDate(value) ?? new Date())
            : value || new Date();

        const defaultDisplay = "default";
        const formattedValue = DateService.formatToStoredDate(defaultDate);

        const handleDateChange = (
          event: DateTimePickerChangeEvent,
          selectedDate?: Date,
        ) => {
          if (Platform.OS === "android") {
            setShowDate(false);
          }

          if (event && selectedDate) {
            onChange(selectedDate);
          }
        };

        return (
          <Column>
            <DateInput
              handlePress={handleShowDate}
              inputText={formattedValue}
              labelText={labelText}
            />

            {showDate && (
              <DateTimePicker
                value={defaultDate}
                onValueChange={handleDateChange}
                mode="date"
                display={defaultDisplay}
                onDismiss={() => {
                  setShowDate(false);
                }}
              />
            )}
          </Column>
        );
      }}
      name={controllerName}
    />
  );
}
