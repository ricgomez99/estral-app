import FormContainer from "@/components/shared/FormContainer";
import { useForm } from "react-hook-form";
import useOptimisticCreate from "@/hooks/useOptimisticCreate";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import {
  FormConditionController,
  FormDateController,
  FormSwitchController,
} from "@/components/shared/Controllers";
import MedicatedFields from "../MedicatedFields";
import { FieldGroup } from "@expo/ui";
import useGetAnimalById from "@/hooks/useGetAnimalById";
import { CreateReproductiveEventData } from "@/lib/zod-schemas/createReproductiveEventsSchema";
import { runCreateSingleEventOrchestrator } from "@/services/orchestrators/create-single-event-orchestrator";

interface IFormProps {
  animalId: string;
}

export default function CreateRangeForm({ animalId }: IFormProps) {
  const { animal } = useGetAnimalById(animalId);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { control, handleSubmit, setValue } =
    useForm<CreateReproductiveEventData>({
      defaultValues: {
        medicated: false,
        medication: undefined,
        application_date: new Date().toString(),
      },
    });

  const { mutate: createRange, isPending } = useOptimisticCreate({
    queryKey: ["animal-ranges", animalId],
    mutateFn: async (formData: CreateReproductiveEventData) => {
      const payload = {
        ...formData,
        id: String(animal?.id),
        name: String(animal?.name),
        is_donor: animal?.is_donor ?? false,
        is_recipient: animal?.is_recipient ?? false,
      };
      const result = await runCreateSingleEventOrchestrator(
        payload,
        String(animal?.owner_id),
      );

      if (!result.ok) {
        throw result.error;
      }

      return result.value;
    },
  });

  const submit = (data: CreateReproductiveEventData) => {
    if (!data) return;

    createRange(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["animal-ranges", animalId],
        });

        queryClient.invalidateQueries({
          queryKey: ["animal", animalId],
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
    });
  };

  const onPressSubmit = handleSubmit(submit);

  return (
    <FormContainer onSubmit={onPressSubmit} disableButton={isPending}>
      <FieldGroup.Section>
        <FormSwitchController
          control={control}
          controllerName="medicated"
          labelText="Medication Applied"
        />
        <MedicatedFields
          control={control}
          controlName={["medication", "application_date"]}
        />
      </FieldGroup.Section>
      <FieldGroup.Section>
        <FormConditionController
          control={control}
          controllerName="reproduction_details"
          setControlValue={setValue}
        />
        <FormDateController
          control={control}
          controllerName="last_oestrus"
          labelText="Last Oestrus Date"
        />
      </FieldGroup.Section>
    </FormContainer>
  );
}
