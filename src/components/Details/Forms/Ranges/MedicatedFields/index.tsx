import FormController from "@/components/shared/FormController";
import FormDateController from "@/components/shared/FormDateController";
import { medicationOptions } from "@/utils/consts";
import { Control, useWatch } from "react-hook-form";
import { IFertilityRange } from "@/types/mock-types";
import { FieldGroup } from "@expo/ui";

interface IFieldProps {
  control: Control<IFertilityRange>;
}

export default function MedicatedFields({ control }: IFieldProps) {
  const isMedicated = useWatch({ control, name: "medicated" });

  if (!isMedicated) return null;

  return (
    <FieldGroup.Section>
      <FormController
        control={control}
        controllerName="medication"
        inputType="picker"
        inputPlaceHolder="Medication"
        pickerOptions={medicationOptions}
      />
      <FormDateController
        control={control}
        controllerName="application_date"
        labelText="Application Date"
      />
    </FieldGroup.Section>
  );
}
