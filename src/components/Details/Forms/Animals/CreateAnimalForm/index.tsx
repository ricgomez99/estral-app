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
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { FieldGroup, RNHostView } from "@expo/ui";
import { createAnimalSchema, AnimalFormData } from "@/lib/zod-schemas";
import { useEffect } from "react";
import { DateService } from "@/lib";
import { runAnimalCreationPipeline } from "@/services/orchestrators/register-animal-orchestrator-runner";
import { useAuthStore } from "@/stores";

export default function CreateAnimalForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const defaultDate = DateService.formatToStoredDate(new Date());
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
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

  const { session } = useAuthStore();

  useEffect(() => {
    if (sexValue !== "Female") {
      setValue("reproduction_details", undefined, { shouldValidate: true });
      setValue("last_oestrus", "", { shouldValidate: true });
      setValue("isDonor", false);
      setValue("isRecipient", false);
      return;
    }

    if (conditionValue === "Pregnant") {
      setValue("last_oestrus", "", { shouldValidate: true });
      setValue("reproduction_details", {
        type: "transfer",
        date: defaultDate as string,
        embryon_days: 1,
      });
    } else {
      setValue("reproduction_details", undefined, { shouldValidate: true });
      setValue("last_oestrus", String(defaultDate), {
        shouldValidate: true,
      });
    }
  }, [sexValue, conditionValue, setValue, defaultDate]);

  const { mutate: createAnimal, isPending } = useOptimisticCreate({
    queryKey: ["animals"],
    mutateFn: async (formData: AnimalFormData) => {
      if (!session?.user.id) {
        throw new Error("User must be authenticated");
      }

      const result = await runAnimalCreationPipeline(formData, session.user.id);

      if (!result.ok) {
        throw result.error;
      }

      return result.value;
    },
    updateFn: (oldData: IAnimal[] | undefined, newItem: AnimalFormData) => {
      const currentArray = oldData ?? [];
      const tempAnimal: IAnimal = {
        id: `temp-${Date.now()}`,
        name: newItem.name,
        sex: newItem.sex,
        type: newItem.type,
        breed: newItem.breed,
        age: newItem.age,
        condition: newItem.condition,
        image: newItem.image,
        reproduction_details: newItem.reproduction_details,
      } as unknown as IAnimal;

      return [tempAnimal, ...currentArray];
    },
  });

  console.log("errors: ", errors);

  const submit = (data: AnimalFormData) => {
    if (!data || isPending) return;

    console.log(data);

    createAnimal(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["animals"],
        });

        queryClient.invalidateQueries({
          queryKey: ["reproductive_events"],
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
          text1:
            error instanceof Error
              ? error.message
              : `Unable to create animal, error: ${error}`,
          position: "top",
        });
      },
    });
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
          {conditionValue === "Not Pregnant" && (
            <FormDateController
              control={control}
              controllerName="last_oestrus"
              labelText="Last Oestrus Date"
            />
          )}
        </FieldGroup.Section>
      )}
      {conditionValue === "Pregnant" && sexValue === "Female" && (
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

      {sexValue === "Female" && (
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
      )}
    </FormContainer>
  );
}
