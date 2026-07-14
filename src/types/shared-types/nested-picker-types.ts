interface INestedPickerProps {
  labelCategory: string;
  labelSubcategory: string;
  pickerLabel?: string;
  selectedCategory: string;
  onCategoryChange: (newValue: string) => void;
  categories: string[];
  selectedSubcategory: string;
  onSubcategoryChange: (subcategory: string) => void;
  subcategories: string[];
}

export { INestedPickerProps };
