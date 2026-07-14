import FormContainer from "@/components/shared/FormContainer";
import FormController from "@/components/shared/FormController";
import { useForm } from "react-hook-form";
import { IAnimal } from "@/types/mock-types";
import useGenericUpdate from "@/hooks/useGenericUpdate";
import { ANIMALS } from "@/utils/mocks";
import { useRouter } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { sexOptions, typeOptions } from "@/utils/consts";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { FieldGroup } from "@expo/ui";
import { useEffect } from "react";
interface IUpdateFormProps {
  defaultData: IAnimal | undefined;
}

export default function UpdateAnimalForm({ defaultData }: IUpdateFormProps) {
  const { control, handleSubmit, reset } = useForm<IAnimal>({
    defaultValues: {
      name: "",
      age: "",
      type: "",
      sex: "",
    },
  });

  useEffect(() => {
    if (defaultData) {
      reset({
        name: defaultData.name,
        age: defaultData.age,
        type: defaultData.type,
        sex: defaultData.sex,
      });
    }
  }, [defaultData, reset]);

  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: updateAnimal } = useGenericUpdate<IAnimal>({
    queryKey: ["animals"],
    mutateFn: async (animal: IAnimal) => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const index = ANIMALS.findIndex((item) => item.id === animal.id);
      if (index !== -1) {
        ANIMALS[index] = { ...ANIMALS[index], ...animal };
      }

      return ANIMALS[index];
    },
  });

  const submit = (data: IAnimal) => {
    // Provitional Update Process
    if (!defaultData?.id) return;

    updateAnimal(
      {
        ...data,
        id: defaultData?.id,
      },
      {
        onSuccess: (updatedAnimal) => {
          if (updatedAnimal) {
            queryClient.setQueryData(["animal", defaultData.id], updatedAnimal);
          }

          if (router.canGoBack()) router.back();

          Toast.show({
            type: "success",
            text1: `${data.name} has been updated successfully`,
            position: "top",
          });
        },

        onError: (error) => {
          Toast.show({
            type: "error",
            text1: `Unable to update animal, error: ${error}`,
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
          inputPlaceHolder="Name"
          inputType="input"
        />

        <FormController
          control={control}
          controllerName="age"
          inputPlaceHolder="Age"
          inputType="input"
        />
      </FieldGroup.Section>
      <FieldGroup.Section>
        <FormController
          control={control}
          controllerName="type"
          inputPlaceHolder="Type"
          inputType="picker"
          pickerOptions={typeOptions}
        />
        <FormController
          control={control}
          controllerName="sex"
          inputPlaceHolder="Sex"
          inputType="picker"
          pickerOptions={sexOptions}
        />
      </FieldGroup.Section>
    </FormContainer>
  );
}
