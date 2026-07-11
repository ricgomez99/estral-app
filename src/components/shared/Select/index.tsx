import { OptionType } from "@/types/picker-types";
import { Row, Picker, Text } from "@expo/ui";
import { StyleSheet } from "react-native";

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
    <Row alignment="center" spacing={16}>
      <Text textStyle={styles.label}>{placeholder}</Text>
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

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
});
