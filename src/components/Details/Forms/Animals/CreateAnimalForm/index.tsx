import Form from "@/components/shared/Form";
import FormController from "@/components/shared/FormController";
import { IAnimal } from "@/types/mock-types";
import { useForm } from "react-hook-form";
import { sexOptions, typeOptions } from "@/utils/consts";

export default function CreateAnimalForm() {
  const { control, handleSubmit } = useForm<IAnimal>();
  const submit = () => {};

  return (
    <Form onSubmit={handleSubmit(submit)} headerTitle="Create Form">
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
      <FormController
        control={control}
        controllerName="sex"
        inputType="picker"
        inputPlaceHolder="Animal Sex"
        pickerOptions={sexOptions}
      />
      <FormController
        control={control}
        controllerName="type"
        inputType="picker"
        inputPlaceHolder="Animal Specie"
        pickerOptions={typeOptions}
      />
      <FormController
        control={control}
        controllerName="microchipId"
        inputType="input"
        inputPlaceHolder="Chip Number"
      />
    </Form>
  );
}
