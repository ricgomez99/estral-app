import { useState } from "react";
import {
  Control,
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";
import SegmentedButtons from "../../Buttons/SegmentedButtons";
import TransferReproductionController from "../TransferReproductionController";
import { REPRODUCTION_TYPES } from "@/utils/consts";
import FormDateController from "../FormDateController";
import { Column } from "@expo/ui";

interface IControllerProps<T extends FieldValues> {
  control: Control<T>;
  controllerName: Path<T>;
  setControlValue: UseFormSetValue<T>;
}

type ReproductiveOptions = "natural" | "insemination" | "transfer";

export default function FormConditionController<T extends FieldValues>({
  control,
  controllerName,
  setControlValue,
}: IControllerProps<T>) {
  const conditionValue = useWatch({
    control: control,
    name: "condition" as Path<T>,
  });

  const isPregnant = conditionValue === "Pregnant";

  const [optionSelected, setOptionSelected] =
    useState<ReproductiveOptions>("natural");
  const handlePress = (index: number) => {
    const selected = options.at(index)?.toLowerCase() as ReproductiveOptions;
    const typePath = `${controllerName}.type` as Path<T>;

    if (selected) {
      setOptionSelected(selected);
      setControlValue(typePath, selected as PathValue<T, typeof typePath>);
    }
  };

  if (!isPregnant) {
    return null;
  }

  const options = REPRODUCTION_TYPES;
  const DATE_LABELS: Record<
    Extract<ReproductiveOptions, "natural" | "insemination">,
    string
  > = {
    insemination: "Insemination Date",
    natural: "Mating Date",
  };

  const selectedOption =
    optionSelected.charAt(0).toUpperCase() + optionSelected.slice(1);

  return (
    <Column spacing={12}>
      <SegmentedButtons
        options={options}
        selectedOption={selectedOption}
        onPress={handlePress}
      />
      {optionSelected !== "transfer" ? (
        <FormDateController
          control={control}
          controllerName={`${controllerName}.date` as Path<T>}
          labelText={DATE_LABELS[optionSelected]}
        />
      ) : (
        <TransferReproductionController
          control={control}
          controllerName={controllerName}
        />
      )}
    </Column>
  );
}
