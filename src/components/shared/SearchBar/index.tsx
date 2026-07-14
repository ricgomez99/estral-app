import { View, TextInput, StyleSheet } from "react-native";
interface SearchBarProps {
  value: string;
  handleChange: (text: string) => void;
}

export default function SearchBar({ value, handleChange }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        defaultValue={value}
        onChangeText={handleChange}
        clearButtonMode="always"
        placeholder="Search"
        enterKeyHint="search"
        inputMode="search"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  searchBar: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
});
