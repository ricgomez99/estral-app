import { DatePicker, DatePickerComponent } from "@expo/ui/swift-ui";
import { IDatePickerProps } from "@/types/shared-types/date-picker-types";
import { DateService } from "@/lib";

export default function DatePickerCustom({
  label,
  selectedDate,
  onChange,
  components,
}: IDatePickerProps) {
  return (
    <DatePicker
      title={label}
      selection={selectedDate as Date}
      displayedComponents={components as DatePickerComponent[]}
      onDateChange={(newDate) => {
        if (newDate) {
          const formattedDate = DateService.formatToStoredDate(newDate);
          onChange(formattedDate as string);
        }
      }}
    />
  );
}
