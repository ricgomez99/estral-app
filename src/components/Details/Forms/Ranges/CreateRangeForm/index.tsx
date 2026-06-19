import Form from "@/components/shared/Form";
import { IAnimal, IFertilityRange } from "@/types/mock-types";
import { useForm } from "react-hook-form";
import FormDateController from "@/components/shared/FormDateController";
import { createAnimalRange } from "@/utils/mock-functions";
import { View, StyleSheet, Alert } from "react-native";
import useOptimisticCreate from "@/hooks/useOptimisticCreate";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";

interface IFormProps {
  animalId: string;
}

export default function CreateRangeForm({ animalId }: IFormProps) {
  const { control, handleSubmit } = useForm<IFertilityRange>();
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
        id: animalId,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["animal-ranges", animalId],
          });

          Alert.alert("Range Saved!", `New range created successfully`, [
            { text: "OK", onPress: () => router.back() },
          ]);
        },
        onError: (error) => {
          Alert.alert("Error", `Unable to create range, error: ${error}`);
        },
      },
    );
  };

  return (
    <Form onSubmit={handleSubmit(submit)} headerTitle="Create Form">
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
    </Form>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    marginBottom: 20,
  },
});
