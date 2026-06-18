import Form from "@/components/shared/Form";
import FormDateController from "@/components/shared/FormDateController";
import { useForm } from "react-hook-form";
import { IAnimal, IFertilityRange } from "@/types/mock-types";
import { View, StyleSheet, Alert } from "react-native";
import useGenericUpdate from "@/hooks/useGenericUpdate";
import { updateAnimalRange } from "@/utils/mock-functions";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
interface IFormProps {
  defaultData: IFertilityRange | undefined;
  animalId: string;
}

export default function UpdateRangeForm({ defaultData, animalId }: IFormProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { handleSubmit, control } = useForm<IFertilityRange>({
    defaultValues: defaultData,
  });

  const { mutate: updateRange } = useGenericUpdate<IFertilityRange>({
    queryKey: ["animal-ranges", animalId],
    mutateFn: (range: IFertilityRange) => updateAnimalRange(range, animalId),
  });

  const submit = (data: IFertilityRange) => {
    updateRange(
      { ...data, id: defaultData?.id as string },
      {
        onSuccess: (updatedRange) => {
          if (updatedRange) {
            queryClient.setQueryData<IAnimal>(
              ["animal-ranges", animalId],
              (oldData) => {
                if (!oldData) return oldData;
                const nextRanges = oldData?.fertility_ranges.map((r) =>
                  r.id === updatedRange.id ? updatedRange : r,
                );

                return {
                  ...oldData,
                  fertility_ranges: nextRanges,
                };
              },
            );

            queryClient.setQueryData(
              ["range", animalId, updatedRange.id],
              updatedRange,
            );
          }
          queryClient.invalidateQueries({
            queryKey: ["animal-ranges", animalId],
          });

          queryClient.invalidateQueries({
            queryKey: ["range", animalId, updatedRange.id],
          });

          Alert.alert(
            "Animal Updated!",
            `${data.subject} range has been saved successfully`,
            [{ text: "OK", onPress: () => router.back() }],
          );
        },
        onError: (error) => {
          Alert.alert("Error", `Unable to process changes, error: ${error}`);
        },
      },
    );
  };

  return (
    <Form onSubmit={handleSubmit(submit)} headerTitle="Update Range">
      <View style={styles.wrapper}>
        <FormDateController
          control={control}
          controllerName="min_date"
          labelText="Min Date Range"
        />
        <FormDateController
          control={control}
          controllerName="max_date"
          labelText="Max Date Range"
        />
      </View>
    </Form>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    marginBottom: 20,
  },
});
