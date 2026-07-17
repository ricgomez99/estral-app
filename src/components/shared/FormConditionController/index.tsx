import React, { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import SegmentedButtons from "../Buttons/SegmentedButtons";
import { TransferReproduction } from "@/components/FormSections";
import { REPRODUCTION_TYPES } from "@/utils/consts";
import FormDateController from "../FormDateController";
import { Column } from "@expo/ui";

interface IControllerProps<T extends FieldValues> {
  control: Control<T>;
  controllerName: Path<T>;
  watchProp?: string;
}

type ReproductiveOptions = "natural" | "insemination" | "transfer";

export default function FormConditionController<T extends FieldValues>({
  control,
  controllerName,
}: IControllerProps<T>) {
  const options = REPRODUCTION_TYPES;

  const [optionSelected, setOptionSelected] =
    useState<ReproductiveOptions>("natural");
  const handlePress = (index: number) => {
    const selected = options.at(index)?.toLowerCase() as ReproductiveOptions;
    if (selected) {
      setOptionSelected(selected);
    }
  };

  const REPRODUCTIVE_FORMS: Record<
    ReproductiveOptions,
    () => React.JSX.Element
  > = {
    natural: () => (
      <FormDateController
        control={control}
        controllerName={`${controllerName}.date` as Path<T>}
        labelText="Mating Date"
      />
    ),
    insemination: () => (
      <FormDateController
        control={control}
        controllerName={`${controllerName}.date` as Path<T>}
        labelText="Insemination Date"
      />
    ),
    transfer: () => (
      <TransferReproduction
        control={control}
        controllerName={"reproduction_details" as Path<T>}
      />
    ),
  };

  const selectedOption =
    optionSelected.charAt(0).toUpperCase() + optionSelected.slice(1);

  return (
    <Controller
      control={control}
      name={controllerName}
      render={({ field: { onChange, value } }) => (
        <Column spacing={12}>
          <SegmentedButtons
            options={options}
            selectedOption={selectedOption}
            onPress={handlePress}
          />
          {REPRODUCTIVE_FORMS[optionSelected]()}
        </Column>
      )}
    />
  );
}
