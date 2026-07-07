import { OptionType } from "@/types/picker-types";
import { Row, Picker, Text, Spacer } from "@expo/ui";

interface ISelectProps {
  options: OptionType[] | undefined;
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
}

export default function Select({
  options,
  value,
  onChange,
  placeholder,
}: ISelectProps) {
  const handleSelect = (itemValue: string | number) => {
    onChange(itemValue);
  };

  return (
    <Row alignment="center" spacing={8} style={{ padding: 8 }}>
      <Text>{placeholder}</Text>
      <Spacer flexible />
      <Picker
        appearance="menu"
        selectedValue={value}
        onValueChange={handleSelect}>
        {options &&
          options.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
      </Picker>
    </Row>
  );
}
