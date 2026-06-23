import Form from "@/components/shared/Form";
import FormController from "@/components/shared/FormController";
import FormSwitchController from "@/components/shared/FormSwitchController";
import { IAnimal } from "@/types/mock-types";
import { useForm } from "react-hook-form";
import { sexOptions, typeOptions } from "@/utils/consts";
import { View, StyleSheet } from "react-native";

export default function CreateAnimalForm() {
  const { control, handleSubmit } = useForm<IAnimal>();
  const submit = (data: IAnimal) => {
    console.log("Created Animal: ", data);
  };

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
      <View style={styles.switches}>
        <FormSwitchController
          control={control}
          controllerName="isRecipient"
          labelText="Mark as recipient"
        />
        <FormSwitchController
          control={control}
          controllerName="isDonor"
          labelText="Mark as Donor"
        />
      </View>
    </Form>
  );
}

const styles = StyleSheet.create({
  switches: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    gap: 20,
  },
});
