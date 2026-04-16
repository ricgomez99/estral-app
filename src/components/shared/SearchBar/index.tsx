import { View, TextInput } from "react-native";

interface SearchBarProps {
  value: string;
  handleChange: (text: string) => void;
}

export default function SearchBar({ value, handleChange }: SearchBarProps) {
  return (
    <View>
      <TextInput
        defaultValue={value}
        onChangeText={handleChange}
        clearButtonMode="always"
        placeholder="Search"
      />
    </View>
  );
}
