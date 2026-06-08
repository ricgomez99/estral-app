import Form from "@/components/shared/Form";
import FormController from "@/components/shared/FormController";
import { useForm } from "react-hook-form";
import useRawAnimalsData from "@/hooks/useRawAnimalsData";
import useGenericUpdate from "@/hooks/useGenericUpdate";
import { OptionType } from "@/types/picker-types";

interface IFormProps {
  defaultAnimal: string | undefined;
}

export default function UpdateRangeForm({ defaultAnimal }: IFormProps) {
  const { handleSubmit, control } = useForm();
  const { animals } = useRawAnimalsData();

  const animalNames: OptionType[] | undefined =
    animals &&
    animals.map((animal) => {
      return {
        label: animal.name,
        value: animal.name.toLowerCase(),
      } as OptionType;
    });

  const submit = () => {};
  return (
    <Form onSubmit={handleSubmit(submit)} headerTitle="Update Range">
      <FormController
        control={control}
        controllerName="Related Animal"
        inputType="picker"
        inputPlaceHolder={defaultAnimal}
        pickerOptions={animalNames}
      />
    </Form>
  );
}
