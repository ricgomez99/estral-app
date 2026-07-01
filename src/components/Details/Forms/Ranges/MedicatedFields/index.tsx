import FormController from "@/components/shared/FormController";
import FormDateController from "@/components/shared/FormDateController";
import { medicationOptions } from "@/utils/consts";
import { Control, useWatch } from "react-hook-form";
import { View, StyleSheet } from "react-native";
import { IFertilityRange } from "@/types/mock-types";

interface IFieldProps {
  control: Control<IFertilityRange>;
}

export default function MedicatedFields({ control }: IFieldProps) {
  const isMedicated = useWatch({ control, name: "medicated" });

  if (!isMedicated) return null;

  return (
    <View style={styles.inputWrapper}>
      <FormController
        control={control}
        controllerName="medication"
        inputType="picker"
        inputPlaceHolder="Select Medication"
        pickerOptions={medicationOptions}
      />
      <FormDateController
        control={control}
        controllerName="application_date"
        labelText="Application Date"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "column",
    marginBottom: 20,
    gap: 10,
  },
});
