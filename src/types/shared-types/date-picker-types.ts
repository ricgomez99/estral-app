import { AndroidVariant, DisplayedComponents } from "@expo/ui/jetpack-compose";
import { DatePickerComponent } from "@expo/ui/swift-ui";

interface IDatePickerProps {
  label?: string;
  selectedDate: string | Date | null | undefined;
  onChange: (date: string | Date) => void;
  components: DisplayedComponents | DatePickerComponent[] | undefined;
  variant?: AndroidVariant | undefined;
}

export type { IDatePickerProps };
