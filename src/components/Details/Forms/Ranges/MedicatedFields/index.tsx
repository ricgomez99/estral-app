import {
  FormDateController,
  FormController,
} from "@/components/shared/Controllers";
import { medicationOptions } from "@/utils/consts";
import { Control, useWatch, FieldValues, Path } from "react-hook-form";
import { FieldGroup } from "@expo/ui";

interface IFieldProps<T extends FieldValues> {
  control: Control<T>;
  controlName: Path<T>[];
}

export default function MedicatedFields<T extends FieldValues = FieldValues>({
  control,
  controlName,
}: IFieldProps<T>) {
  const isMedicated = useWatch({ control, name: controlName[0] });

  if (!isMedicated) return null;

  return (
    <FieldGroup.Section>
      <FormController
        control={control}
        controllerName={controlName[0]}
        inputType="picker"
        inputPlaceHolder="Medication"
        pickerOptions={medicationOptions}
      />
      <FormDateController
        control={control}
        controllerName={controlName[1]}
        labelText="Application Date"
      />
    </FieldGroup.Section>
  );
}
