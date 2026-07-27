import { DatePicker, DatePickerComponent } from "@expo/ui/swift-ui";
import { IDatePickerProps } from "@/types/shared-types/date-picker-types";

export default function DatePickerCustom({
  label,
  selectedDate,
  onChange,
  components,
}: IDatePickerProps) {
  return (
    <DatePicker
      title={label}
      selection={selectedDate!}
      displayedComponents={components as DatePickerComponent[]}
      onDateChange={(newDate) => onChange(newDate)}
    />
  );
}
