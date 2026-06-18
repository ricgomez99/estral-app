import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Platform } from "react-native";
import { useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { DateService } from "@/lib";
import DateInput from "../DateInput";

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

        const defaultDisplay = Platform.OS === "ios" ? "spinner" : "calendar";
        const formattedValue = DateService.formatToStoredDate(defaultDate);

        const handleDateChange = (
          event: DateTimePickerEvent,
          selectedDate?: Date,
        ) => {
          if (Platform.OS === "android") setShowDate(false);
          if (selectedDate) onChange(selectedDate);
        };

        return (
          <DateInput
            handlePress={handleShowDate}
            inputText={formattedValue}
            addLabel={true}
            labelText={labelText}>
            {showDate && (
              <DateTimePicker
                value={defaultDate}
                mode="date"
                display={defaultDisplay}
                onChange={handleDateChange}
              />
            )}
          </DateInput>
        );
      }}
      name={controllerName}
    />
  );
}
