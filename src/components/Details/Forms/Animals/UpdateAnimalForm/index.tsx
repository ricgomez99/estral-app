import Form from "@/components/shared/Form";
import FormController from "@/components/shared/FormController";
import { useForm } from "react-hook-form";
import { IAnimal } from "@/types/mock-types";
import useGenericUpdate from "@/hooks/useGenericUpdate";
import { ANIMALS } from "@/utils/mocks";
import { Alert, Text } from "react-native";
import { useRouter } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { sexOptions, typeOptions } from "@/utils/consts";

interface IUpdateFormProps {
  defaultData: IAnimal | undefined;
}

export default function UpdateAnimalForm({ defaultData }: IUpdateFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IAnimal>({
    defaultValues: defaultData,
  });

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

          Alert.alert(
            "Animal Updated!",
            `${data.name} has been saved successfully`,
            [{ text: "OK", onPress: () => router.back() }],
          );
        },

        onError: () => {
          Alert.alert("Error", "Unable to process changes");
        },
      },
    );
  };

  return (
    <Form onSubmit={handleSubmit(submit)} headerTitle="Update">
      <FormController
        control={control}
        controllerName="name"
        inputPlaceHolder="Name"
        inputType="input"
      />
      {errors.name && <Text>{errors.name.message}</Text>}
      <FormController
        control={control}
        controllerName="age"
        inputPlaceHolder="Age"
        inputType="input"
      />
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
    </Form>
  );
}
