import { INestedPickerProps } from "@/types/shared-types/nested-picker-types";
import { Host, Text, Picker } from "@expo/ui/swift-ui";
import { tag, pickerStyle } from "@expo/ui/swift-ui/modifiers";
import { StyleSheet } from "react-native";

export default function NestedPicker({
  labelCategory,
  labelSubcategory,
  selectedCategory,
  onCategoryChange,
  categories,
  selectedSubcategory,
  onSubcategoryChange,
  subcategories,
}: INestedPickerProps) {
  const currentSelection = selectedSubcategory || selectedCategory;

  return (
    <Host matchContents style={styles.container}>
      <Picker
        label={labelCategory}
        modifiers={[pickerStyle("menu")]}
        selection={currentSelection}
        onSelectionChange={(newValue) => {
          onCategoryChange(newValue);
        }}>
        {categories &&
          categories.map((item, index) => (
            <Text key={`cat-${index}`} modifiers={[tag(item)]}>
              {item}
            </Text>
          ))}

        {selectedSubcategory && (
          <Text modifiers={[tag(selectedSubcategory)]}>
            {selectedSubcategory}
          </Text>
        )}
        <Picker
          label={labelSubcategory}
          modifiers={[pickerStyle("menu")]}
          selection={selectedSubcategory}
          onSelectionChange={(newValue) => {
            onSubcategoryChange(newValue);
          }}>
          {subcategories &&
            subcategories.map((item, index) => (
              <Text key={`sub-${index}`} modifiers={[tag(item)]}>
                {item}
              </Text>
            ))}
        </Picker>
      </Picker>
    </Host>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
