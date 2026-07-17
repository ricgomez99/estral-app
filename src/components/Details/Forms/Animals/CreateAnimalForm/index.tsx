import FormContainer from "@/components/shared/FormContainer";
import FormController from "@/components/shared/FormController";
import FormSwitchController from "@/components/shared/FormSwitchController";
import FormImageController from "@/components/shared/FormImageController";
import FormBreedController from "@/components/shared/FormBreedController";
import FormConditionController from "@/components/shared/FormConditionController";
import { IAnimal } from "@/types/mock-types";
import { useForm } from "react-hook-form";
import { sexOptions, typeOptions, conditionOptions } from "@/utils/consts";
import useOptimisticCreate from "@/hooks/useOptimisticCreate";
import { addAnimalMock } from "@/utils/mock-functions";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { FieldGroup, RNHostView } from "@expo/ui";

export default function CreateAnimalForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { control, handleSubmit, setValue } = useForm<IAnimal>({
    defaultValues: {
      name: "",
      age: "",
      microchipId: "",
      breed: undefined,
      condition: undefined,
      reproduction_details: {
        type: "transfer",
        date: "",
        embryon_days: "",
      },
      isDonor: false,
      isRecipient: false,
    },
  });

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

  const submit = (data: IAnimal) => {
    if (!data) return;

    createAnimal(
      { ...data },
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

  return (
    <FormContainer onSubmit={submit} handleSubmit={handleSubmit}>
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
        <FormController
          control={control}
          controllerName="condition"
          inputType="picker"
          inputPlaceHolder="Condition"
          pickerOptions={conditionOptions}
        />
        <FormBreedController control={control} controllerName="breed" />
      </FieldGroup.Section>
      <FieldGroup.Section>
        <FormConditionController control={control} controllerName="condition" />
      </FieldGroup.Section>
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
