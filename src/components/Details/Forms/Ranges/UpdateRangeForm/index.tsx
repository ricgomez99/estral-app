import FormContainer from "@/components/shared/FormContainer";
import FormDateController from "@/components/shared/FormDateController";
import { useForm } from "react-hook-form";
import { IAnimal, IFertilityRange } from "@/types/mock-types";
import { StyleSheet } from "react-native";
import useGenericUpdate from "@/hooks/useGenericUpdate";
import { updateAnimalRange } from "@/utils/mock-functions";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { FieldGroup } from "@expo/ui";
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
      { ...data },
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
            refetchType: "none",
          });

          queryClient.invalidateQueries({
            queryKey: ["range", animalId, updatedRange.id],
            refetchType: "none",
          });

          if (router.canGoBack()) router.back();

          Toast.show({
            type: "success",
            text1: `${data.subject || "The animal"} range has been saved successfully`,
            position: "top",
          });
        },
        onError: (error) => {
          Toast.show({
            type: "error",
            text1: `Unable to process changes, error: ${error}`,
            position: "top",
          });
        },
      },
    );
  };

  return (
    <FormContainer onSubmit={submit} handleSubmit={handleSubmit}>
      <FieldGroup.Section>
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
      </FieldGroup.Section>
    </FormContainer>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
  },
  wrapper: {
    flexDirection: "row",
    marginBottom: 20,
  },
});
