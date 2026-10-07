import FormContainer from "@/components/shared/FormContainer";
import { FormSwitchController } from "@/components/shared/Controllers";
import { useForm } from "react-hook-form";
import { IAnimal, IReproductiveEvent } from "@/types/mock-types";
import { StyleSheet } from "react-native";
import useGenericUpdate from "@/hooks/useGenericUpdate";
import { updateAnimalRange } from "@/utils/mock-functions";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { FieldGroup } from "@expo/ui";
interface IFormProps {
  defaultData: IReproductiveEvent;
  animalId: string;
}

export default function UpdateRangeForm({ defaultData, animalId }: IFormProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { handleSubmit, control } = useForm<IReproductiveEvent>({
    defaultValues: defaultData,
  });

  const { mutate: updateRange } = useGenericUpdate<IReproductiveEvent>({
    queryKey: ["animal-ranges", animalId],
    mutateFn: (range: IReproductiveEvent) => updateAnimalRange(range, animalId),
  });

  const submit = (data: IReproductiveEvent) => {
    updateRange(data, {
      onSuccess: (updatedEvent) => {
        if (updatedEvent) {
          queryClient.setQueryData<IAnimal>(
            ["animal-ranges", animalId],
            (oldData) => {
              if (!oldData) return oldData;
              const nextEvents = oldData?.reproductive_events?.map((event) =>
                event.id === updatedEvent.id ? updatedEvent : event,
              );

              return {
                ...oldData,
                events: nextEvents,
              };
            },
          );

          queryClient.setQueryData(
            ["range", animalId, updatedEvent.id],
            updatedEvent,
          );
        }
        queryClient.invalidateQueries({
          queryKey: ["animal-ranges", animalId],
          refetchType: "none",
        });

        queryClient.invalidateQueries({
          queryKey: ["range", animalId, updatedEvent.id],
          refetchType: "none",
        });

        if (router.canGoBack()) router.back();

        Toast.show({
          type: "success",
          text1: `${data.animal_name || "The animal"} range has been saved successfully`,
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
    });
  };

  const onPressSubmit = handleSubmit(submit);

  return (
    <FormContainer onSubmit={onPressSubmit}>
      <FieldGroup.Section>
        <FormSwitchController
          control={control}
          controllerName="completed"
          labelText="Mark as completed"
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
