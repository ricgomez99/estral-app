import FormContainer from "@/components/shared/FormContainer";
import FormController from "@/components/shared/FormController";
import FormSwitchController from "@/components/shared/FormSwitchController";
import FormImageController from "@/components/shared/FormImageController";
import { IAnimal } from "@/types/mock-types";
import { useForm } from "react-hook-form";
import { sexOptions, typeOptions } from "@/utils/consts";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useOptimisticCreate from "@/hooks/useOptimisticCreate";
import { addAnimalMock } from "@/utils/mock-functions";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

export default function CreateAnimalForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { control, handleSubmit, setValue } = useForm<IAnimal>({
    defaultValues: {
      name: "",
      age: "",
      microchipId: "",
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
    <SafeAreaView style={styles.formContainer}>
      <FormContainer onSubmit={submit} handleSubmit={handleSubmit}>
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
        <View style={styles.slectContainer}>
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
        </View>
        <FormController
          control={control}
          controllerName="microchipId"
          inputType="input"
          inputPlaceHolder="Chip Number"
        />
        <FormImageController
          control={control}
          controllerName="image"
          labelText="Animal Photo"
        />
        <View style={styles.switches}>
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
        </View>
      </FormContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  scrollConten: {
    flexDirection: "column",
    justifyContent: "center",
  },

  switches: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    gap: 20,
  },

  slectContainer: {
    flexDirection: "row",
    width: "100%",
    gap: 10,
  },
});
