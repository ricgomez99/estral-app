import { FieldValues, Control, Path, Controller } from "react-hook-form";
import { BREEDS, MIXES } from "@/utils/consts";
import NestedPicker from "../NestedPicker";

interface IControllerProps<T extends FieldValues> {
  control: Control<T>;
  controllerName: Path<T>;
}

export default function FormBreedController<T extends FieldValues>({
  control,
  controllerName,
}: IControllerProps<T>) {
  const SUB_CATEGORY = "Mixes";

  return (
    <Controller
      control={control}
      name={controllerName}
      render={({ field: { onChange, value } }) => {
        const isCurrentValueAMix = MIXES.includes(value);
        const computedCategory = isCurrentValueAMix
          ? SUB_CATEGORY
          : value || "";

        return (
          <NestedPicker
            labelCategory={controllerName}
            labelSubcategory={SUB_CATEGORY}
            selectedCategory={computedCategory}
            onCategoryChange={(newType) => {
              if (newType !== SUB_CATEGORY) {
                onChange(newType);
              }
            }}
            categories={[...BREEDS]}
            selectedSubcategory={isCurrentValueAMix ? value : ""}
            onSubcategoryChange={(newSubValue) => {
              if (newSubValue) {
                onChange(newSubValue);
              }
            }}
            subcategories={[...MIXES]}
          />
        );
      }}
    />
  );
}
