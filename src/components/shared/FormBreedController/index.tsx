import { FieldValues, Control, Path, Controller } from "react-hook-form";
import { BREEDS, MIXES } from "@/utils/consts";
import NestedPicker from "../NestedPicker";
import { Column } from "@expo/ui";
import ErrorText from "../ErrorText";

interface IControllerProps<T extends FieldValues> {
  control: Control<T>;
  controllerName: Path<T>;
}

export default function FormBreedController<T extends FieldValues>({
  control,
  controllerName,
}: IControllerProps<T>) {
  const SUB_CATEGORY = "Mixes";
  const CATEGORY_LABEL = "Breed";

  return (
    <Controller
      control={control}
      name={controllerName}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const isCurrentValueAMix = MIXES.includes(value);
        const computedCategory = isCurrentValueAMix
          ? SUB_CATEGORY
          : value || "";

        return (
          <Column>
            <NestedPicker
              labelCategory={CATEGORY_LABEL}
              labelSubcategory={SUB_CATEGORY}
              pickerLabel="Breed"
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
            {error && <ErrorText message={error.message} />}
          </Column>
        );
      }}
    />
  );
}
