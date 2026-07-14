import { INestedPickerProps } from "@/types/shared-types/nested-picker-types";
import {
  ExposedDropdownMenuBox,
  ExposedDropdownMenu,
  TextField,
  DropdownMenuItem,
  useNativeState,
  Text,
  Box,
  Row,
} from "@expo/ui/jetpack-compose";
import {
  fillMaxSize,
  fillMaxWidth,
  menuAnchor,
} from "@expo/ui/jetpack-compose/modifiers";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

export default function NestedPicker({
  labelCategory,
  labelSubcategory,
  pickerLabel,
  selectedCategory,
  onCategoryChange,
  categories,
  selectedSubcategory,
  onSubcategoryChange,
  subcategories,
}: INestedPickerProps) {
  const [expanded, setExpanded] = useState(false);
  const [subExpanded, setSubExpanded] = useState(false);

  const selectedCatLabel = useNativeState(selectedCategory || "");
  const selectedSubCatLabel = useNativeState(selectedSubcategory || "");

  useEffect(() => {
    if (selectedSubcategory) {
      selectedCatLabel.value = selectedSubcategory;
    } else {
      selectedCatLabel.value = selectedCategory || `Select ${labelCategory}`;
    }
    selectedSubCatLabel.value = selectedSubcategory || "";
  }, [selectedCategory, selectedSubcategory]);

  return (
    <Box modifiers={[fillMaxSize()]} contentAlignment="center">
      <Row
        modifiers={[fillMaxWidth()]}
        horizontalAlignment="start"
        verticalAlignment="center"
        horizontalArrangement="spaceBetween">
        <Text style={styles.label}>{pickerLabel}</Text>
        <ExposedDropdownMenuBox
          expanded={expanded}
          onExpandedChange={setExpanded}>
          <TextField
            value={selectedCatLabel}
            readOnly
            modifiers={[menuAnchor()]}
          />

          <ExposedDropdownMenu
            expanded={expanded}
            onDismissRequest={() => setExpanded(false)}>
            {categories &&
              categories.map((item) => (
                <DropdownMenuItem
                  key={item}
                  onClick={() => {
                    onCategoryChange(item);
                    onSubcategoryChange("");
                    setExpanded(false);
                  }}>
                  <DropdownMenuItem.Text>
                    <Text>{item}</Text>
                  </DropdownMenuItem.Text>
                </DropdownMenuItem>
              ))}

            <ExposedDropdownMenuBox
              expanded={subExpanded && subcategories.length > 0}
              onExpandedChange={setSubExpanded}>
              <DropdownMenuItem
                modifiers={[menuAnchor()]}
                onClick={() => {
                  onCategoryChange(labelSubcategory);
                  setSubExpanded(!subExpanded);
                }}>
                <DropdownMenuItem.Text>
                  <Text>
                    {selectedSubcategory
                      ? `${labelSubcategory} (${selectedSubcategory})`
                      : `Check ${labelSubcategory}... ❯`}
                  </Text>
                </DropdownMenuItem.Text>
              </DropdownMenuItem>
              <ExposedDropdownMenu
                expanded={subExpanded}
                onDismissRequest={() => setSubExpanded(false)}>
                {subcategories &&
                  subcategories.map((item) => (
                    <DropdownMenuItem
                      key={item}
                      onClick={() => {
                        onSubcategoryChange(item);
                        setSubExpanded(false);
                        setSubExpanded(false);
                      }}>
                      <DropdownMenuItem.Text>
                        <Text>{item}</Text>
                      </DropdownMenuItem.Text>
                    </DropdownMenuItem>
                  ))}
              </ExposedDropdownMenu>
            </ExposedDropdownMenuBox>
          </ExposedDropdownMenu>
        </ExposedDropdownMenuBox>
      </Row>
    </Box>
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
