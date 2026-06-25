import FormContainer from "@/components/shared/FormContainer";
import { IAnimal, IFertilityRange } from "@/types/mock-types";
import { useForm } from "react-hook-form";
import FormDateController from "@/components/shared/FormDateController";
import { createAnimalRange } from "@/utils/mock-functions";
import { View, StyleSheet } from "react-native";
import useOptimisticCreate from "@/hooks/useOptimisticCreate";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { SafeAreaView } from "react-native-safe-area-context";

interface IFormProps {
  animalId: string;
}

export default function CreateRangeForm({ animalId }: IFormProps) {
  const { control, handleSubmit } = useForm<IFertilityRange>({
    defaultValues: {
      min_date: "",
      max_date: "",
    },
  });
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: createAnimal } = useOptimisticCreate<
    IFertilityRange,
    IAnimal
  >({
    queryKey: ["animal-ranges", animalId],
    mutateFn: (newRange: IFertilityRange) =>
      createAnimalRange(animalId, newRange),
    updateFn: (oldAnimal, newRange) => {
      if (!oldAnimal) return {} as IAnimal;
      return {
        ...oldAnimal,
        fertility_ranges: [...oldAnimal.fertility_ranges, newRange],
      };
    },
  });

  const submit = (data: IFertilityRange) => {
    if (!data) return;
    createAnimal(
      {
        ...data,
        id: `temp-${Date.now()}`,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["animal-ranges", animalId],
          });

          if (router.canGoBack()) router.back();

          Toast.show({
            type: "success",
            text1: `New range created successfully`,
            position: "top",
          });
        },
        onError: (error) => {
          Toast.show({
            type: "error",
            text1: `Unable to create range, error: ${error}`,
            position: "top",
          });
        },
      },
    );
  };

  return (
    <SafeAreaView style={styles.formWrapper}>
      <FormContainer onSubmit={submit} handleSubmit={handleSubmit}>
        <View style={styles.inputWrapper}>
          <FormDateController
            control={control}
            controllerName="min_date"
            labelText="Min Range Date"
          />
          <FormDateController
            control={control}
            controllerName="max_date"
            labelText="Max Range Date"
          />
        </View>
      </FormContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  formWrapper: {
    flex: 1,
  },
  inputWrapper: {
    flexDirection: "row",
    marginBottom: 20,
  },
});
