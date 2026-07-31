import FormContainer from "@/components/shared/FormContainer";
import {
  FormController,
  FormBreedController,
  FormSwitchController,
  FormImageController,
  FormConditionController,
  FormDateController,
} from "@/components/shared/Controllers";

import { IAnimal } from "@/types/mock-types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sexOptions, typeOptions, conditionOptions } from "@/utils/consts";
import useOptimisticCreate from "@/hooks/useOptimisticCreate";
import { addAnimalMock } from "@/utils/mock-functions";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { FieldGroup, RNHostView } from "@expo/ui";
import { createAnimalSchema } from "@/lib/zod-schemas";
import { AnimalFormData } from "@/lib/zod-schemas";
import { useEffect } from "react";
import { DateService } from "@/lib";

export default function CreateAnimalForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const defaultDate = DateService.formatToStoredDate(new Date());
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      name: "",
      age: 3,
      type: "horse",
      microchipId: "",
      sex: "Female",
      breed: "American Quarter Horse",
      condition: "Not Pregnant",
      reproduction_details: undefined,
      last_oestrus: defaultDate,
      isDonor: false,
      isRecipient: false,
    },
    mode: "onTouched",
    resolver: zodResolver(createAnimalSchema),
  });

  const [sexValue, conditionValue] = watch(["sex", "condition"]);

  useEffect(() => {
    if (conditionValue !== "Pregnant") {
      setValue("reproduction_details", undefined, { shouldValidate: true });
    } else {
      setValue("reproduction_details", {
        type: "transfer",
        date: defaultDate as string,
        embryon_days: 1,
      });
    }
  }, [conditionValue, setValue, defaultDate]);

  const { mutate: createAnimal } = useOptimisticCreate({
    queryKey: ["animals"],
    mutateFn: (newAnimal: IAnimal) => addAnimalMock(newAnimal),
    updateFn: (oldData: IAnimal[] | undefined, newItem: IAnimal) => {
      const currentArray = oldData ?? [];
      return [
        ...currentArray,
        {
          ...newItem,
          id: `temp-${Date.now()}`,
          image: newItem.image,
          fertility_ranges: [],
        },
      ];
    },
  });

  const submit = (data: AnimalFormData) => {
    if (!data) return;

    createAnimal(
      { ...(data as IAnimal) },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["animals"],
          });

          if (router.canGoBack()) router.back();

          Toast.show({
            type: "success",
            text1: `Animal created successfully`,
            position: "top",
          });
        },

        onError: (error) => {
          Toast.show({
            type: "error",
            text1: `Unable to create animal, error: ${error}`,
            position: "top",
          });
        },
      },
    );
  };

  const onPressSubmit = handleSubmit(submit);

  return (
    <FormContainer onSubmit={onPressSubmit}>
      <FieldGroup.Section>
        <FormController
          control={control}
          controllerName="name"
          inputType="input"
          inputPlaceHolder="Animal Name"
        />

        <FormController
          control={control}
          controllerName="age"
          inputType="input"
          inputPlaceHolder="Age"
          mode="numeric"
        />
      </FieldGroup.Section>
      <FieldGroup.Section>
        <FormController
          control={control}
          controllerName="sex"
          inputType="picker"
          inputPlaceHolder="Sex"
          pickerOptions={sexOptions}
        />

        <FormController
          control={control}
          controllerName="type"
          inputType="picker"
          inputPlaceHolder="Specie"
          pickerOptions={typeOptions}
        />
        <FormBreedController control={control} controllerName="breed" />
      </FieldGroup.Section>
      {sexValue === "Female" && (
        <FieldGroup.Section>
          <FormController
            control={control}
            controllerName="condition"
            inputType="picker"
            inputPlaceHolder="Condition"
            pickerOptions={conditionOptions}
          />
          <FormDateController
            control={control}
            controllerName="last_oestrus"
            labelText="Last Oestrus Date"
          />
        </FieldGroup.Section>
      )}
      {conditionValue === "Pregnant" && (
        <FieldGroup.Section>
          <FormConditionController
            control={control}
            controllerName="reproduction_details"
            setControlValue={setValue}
          />
        </FieldGroup.Section>
      )}
      <FieldGroup.Section>
        <FormController
          control={control}
          controllerName="microchipId"
          inputType="input"
          inputPlaceHolder="Chip Number"
        />
      </FieldGroup.Section>

      <RNHostView style={{ width: "100%" }} matchContents>
        <FormImageController
          control={control}
          controllerName="image"
          labelText="Animal Photo"
        />
      </RNHostView>

      <FieldGroup.Section>
        <FormSwitchController
          control={control}
          controllerName="isRecipient"
          labelText="Mark as recipient"
          onCustomChange={(newValue) => {
            if (newValue) setValue("isDonor", false);
          }}
        />
        <FormSwitchController
          control={control}
          controllerName="isDonor"
          labelText="Mark as Donor"
          onCustomChange={(newValue) => {
            if (newValue) setValue("isRecipient", false);
          }}
        />
      </FieldGroup.Section>
    </FormContainer>
  );
}
