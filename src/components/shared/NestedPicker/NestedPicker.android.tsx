import { INestedPickerProps } from "@/types/shared-types/nested-picker-types";
import {
  Host,
  ExposedDropdownMenuBox,
  ExposedDropdownMenu,
  TextField,
  DropdownMenuItem,
  useNativeState,
  Text,
  Column,
} from "@expo/ui/jetpack-compose";
import { menuAnchor } from "@expo/ui/jetpack-compose/modifiers";
import { useState } from "react";

export default function NestedPicker({
  selectedCategory,
  onCategoryChange,
  categories,
  selectedSubcategory,
  onSubcategoryChange,
  subcategories,
}: INestedPickerProps) {
  const [expanded, setExpanded] = useState(false);
  const [subExpanded, setSubExpanded] = useState(false);

  const selectedCatLabel = useNativeState(selectedCategory);
  const selectedSubCatLabel = useNativeState(selectedSubcategory);

  return (
    <Host matchContents>
      <Column>
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
                    selectedCatLabel.value = item;
                    onCategoryChange(item);
                    setExpanded(false);
                  }}>
                  <DropdownMenuItem.Text>
                    <Text>{item}</Text>
                  </DropdownMenuItem.Text>
                </DropdownMenuItem>
              ))}
          </ExposedDropdownMenu>
        </ExposedDropdownMenuBox>

        <ExposedDropdownMenuBox
          expanded={subExpanded && subcategories.length > 0}
          onExpandedChange={setSubExpanded}>
          <TextField
            value={selectedSubCatLabel}
            readOnly
            modifiers={[menuAnchor()]}
          />
          <ExposedDropdownMenu
            expanded={subExpanded}
            onDismissRequest={() => setSubExpanded(false)}>
            {subcategories &&
              subcategories.map((item) => (
                <DropdownMenuItem
                  key={item}
                  onClick={() => {
                    selectedSubCatLabel.value = item;
                    onSubcategoryChange(item);
                    setSubExpanded(false);
                  }}>
                  <DropdownMenuItem.Text>
                    <Text>{item}</Text>
                  </DropdownMenuItem.Text>
                </DropdownMenuItem>
              ))}
          </ExposedDropdownMenu>
        </ExposedDropdownMenuBox>
      </Column>
    </Host>
  );
}
