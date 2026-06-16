import Form from "@/components/shared/Form";
import FormController from "@/components/shared/FormController";
import FormDateController from "@/components/shared/FormDateController";
import { useForm } from "react-hook-form";
import { IFertilityRange } from "@/types/mock-types";

interface IFormProps {
  defaultData: IFertilityRange | undefined;
}

export default function UpdateRangeForm({ defaultData }: IFormProps) {
  const { handleSubmit, control } = useForm();

  const submit = () => {};

  return (
    <Form onSubmit={handleSubmit(submit)} headerTitle="Update Range">
      <FormController
        control={control}
        controllerName="min_date"
        inputType="input"
        inputPlaceHolder={defaultData?.min_date}
      />
      <FormDateController
        control={control}
        controllerName="min_date"
        placeHolderText={defaultData?.min_date}
      />
      <FormController
        control={control}
        controllerName="max_date"
        inputType="input"
        inputPlaceHolder={defaultData?.max_date}
      />
    </Form>
  );
}
