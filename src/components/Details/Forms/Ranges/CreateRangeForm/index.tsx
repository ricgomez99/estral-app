import FormContainer from "@/components/shared/FormContainer";
import { IAnimal, IFertilityRange } from "@/types/mock-types";
import { useForm } from "react-hook-form";
import { createAnimalRange, getAnimalById } from "@/utils/mock-functions";
import useOptimisticCreate from "@/hooks/useOptimisticCreate";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { DateService } from "@/lib";
import FormSwitchController from "@/components/shared/FormSwitchController";
import MedicatedFields from "../MedicatedFields";
import NaturalRange from "../NaturalRange";
import { getRangeDates } from "@/services";
import { FieldGroup } from "@expo/ui";

interface IFormProps {
  animalId: string;
}

export default function CreateRangeForm({ animalId }: IFormProps) {
  const { control, handleSubmit } = useForm<IFertilityRange>({
    defaultValues: {
      application_date: "",
      medicated: false,
      medication: null,
    },
  });
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: last_oestrus } = useQuery({
    queryKey: ["animal", animalId, "last_oestrus"],
    queryFn: () => getAnimalById(animalId!),
    select: (data: IAnimal | undefined) => data?.last_oestrus,
    enabled: !!animalId,
  });

  const { mutate: createRange } = useOptimisticCreate<IFertilityRange, IAnimal>(
    {
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
    },
  );

  const submit = (data: IFertilityRange) => {
    if (!data) return;
    const ranges = getRangeDates(data, last_oestrus);

    if (!ranges) return;
    const { minDate, maxDate } = ranges;
    createRange(
      {
        ...data,
        medication: data.medicated ? data.medication : null,
        application_date: data.application_date ? data.application_date : "",
        min_date: DateService.formatToStoredDate(minDate) as string,
        max_date: DateService.formatToStoredDate(maxDate) as string,
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
    <FormContainer onSubmit={submit} handleSubmit={handleSubmit}>
      <FieldGroup.SectionHeader>
        <NaturalRange control={control} lastOestrus={last_oestrus!} />
      </FieldGroup.SectionHeader>
      <FieldGroup.Section>
        <FormSwitchController
          control={control}
          controllerName="medicated"
          labelText="Medication Applied"
        />
        <MedicatedFields control={control} />
      </FieldGroup.Section>
    </FormContainer>
  );
}
