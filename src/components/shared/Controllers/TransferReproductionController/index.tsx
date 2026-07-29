import { Column, TextInput } from "@expo/ui";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import FormDateController from "../FormDateController";
import ErrorText from "../../ErrorText";

interface IProps<T extends FieldValues> {
  control: Control<T>;
  controllerName: Path<T>;
}

export default function TransferReproductionController<T extends FieldValues>({
  control,
  controllerName,
}: IProps<T>) {
  return (
    <Column spacing={12}>
      <FormDateController
        control={control}
        controllerName={`${controllerName}.date` as Path<T>}
        labelText="Transfer Date"
      />

      <Controller
        control={control}
        name={`${controllerName}.embryon_days` as Path<T>}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Column spacing={8}>
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder="Embryon Days"
              style={{ paddingVertical: 20 }}
              inputMode="numeric"
            />
            {error && <ErrorText message={error.message} />}
          </Column>
        )}
      />
    </Column>
  );
}
