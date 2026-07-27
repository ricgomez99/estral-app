import { DateTimePicker, DisplayedComponents } from "@expo/ui/jetpack-compose";
import { IDatePickerProps } from "@/types/shared-types/date-picker-types";

export default function DatePickerCustom({
  onChange,
  selectedDate,
  components,
  variant,
}: IDatePickerProps) {
  return (
    <DateTimePicker
      onDateSelected={(newDate) => onChange(newDate)}
      displayedComponents={components as DisplayedComponents}
      initialDate={selectedDate?.toString()}
      variant={variant}
    />
  );
}
