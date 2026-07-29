import { DateTimePicker, DisplayedComponents } from "@expo/ui/jetpack-compose";
import { IDatePickerProps } from "@/types/shared-types/date-picker-types";
import { DateService } from "@/lib";

export default function DatePickerCustom({
  onChange,
  selectedDate,
  components,
  variant,
}: IDatePickerProps) {
  return (
    <DateTimePicker
      onDateSelected={(newDate) => {
        if (newDate) {
          const formattedDate = DateService.formatToStoredDate(newDate);
          onChange(formattedDate as string);
        }
      }}
      displayedComponents={components as DisplayedComponents}
      initialDate={selectedDate?.toString()}
      variant={variant}
    />
  );
}
