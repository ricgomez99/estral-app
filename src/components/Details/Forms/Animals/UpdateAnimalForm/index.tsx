import Form from "@/components/shared/Form";
import FormController from "@/components/shared/FormController";
import { useForm } from "react-hook-form";
import { IAnimal } from "@/types/mock-types";
import { OptionType } from "@/types/picker-types";
import useGenericUpdate from "@/hooks/useGenericUpdate";
import { ANIMALS } from "@/utils/mocks";
import { Alert } from "react-native";

interface IUpdateFormProps {
  defaultData: IAnimal | undefined;
  onSuccessClose: () => void;
}

export default function UpdateAnimalForm({
  defaultData,
  onSuccessClose,
}: IUpdateFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IAnimal>({ defaultValues: defaultData });

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

  const sexOptions: OptionType[] = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  const typeOptions: OptionType[] = [
    { label: "Donkey", value: "donkey" },
    { label: "Horse", value: "horse" },
    { label: "Zebra", value: "zebra" },
  ];

  const submit = (data: IAnimal) => {
    // Provitional Update Process
    if (!defaultData?.id) return;

    updateAnimal(
      {
        ...data,
        id: defaultData?.id,
      },
      {
        onSuccess: () => {
          onSuccessClose();
          Alert.alert(
            "Animal Updated!",
            `${data.name} has been saved successfully`,
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
