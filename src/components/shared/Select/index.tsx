import { Picker } from "@react-native-picker/picker";
import { StyleSheet } from "react-native";
import { OptionType } from "@/types/picker-types";

interface ISelectProps {
  options: OptionType[] | undefined;
  value: string | number;
  onChange: () => void;
}

export default function Select({ options, value, onChange }: ISelectProps) {
  return (
    <Picker
      style={styles.picker}
      selectedValue={value}
      onValueChange={onChange}
      mode="dropdown">
      {options &&
        options.map((option) => (
          <Picker.Item label={option.label} value={option.value} />
        ))}
    </Picker>
  );
}

const styles = StyleSheet.create({
  picker: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#BBBB",
    borderRadius: 8,
    width: "100%",
  },
});
