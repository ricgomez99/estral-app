import { UpdateRangeForm } from "@/components/Details/Forms";
import { useLocalSearchParams } from "expo-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRangeById } from "@/utils/mock-functions";
import SpinLoader from "@/components/shared/SpinLoader";
import { IAnimal, IReproductiveEvent } from "@/types/mock-types";

export default function UpdateRangeScreen() {
  const queryClient = useQueryClient();
  const { id, rangeId } = useLocalSearchParams();
  const { data: range, isLoading } = useQuery({
    queryKey: ["range", id, rangeId],
    queryFn: () => getRangeById(id as string, rangeId as string),
    enabled: !!id && !!rangeId,
    initialData: () => {
      const animalCache = queryClient.getQueryData<IAnimal>([
        "animal-ranges",
        id,
      ]);
      return animalCache?.events?.find((range) => range.id === rangeId);
    },
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <SpinLoader />;
  }

  console.log("event: ", range);

  return (
    <UpdateRangeForm
      defaultData={range as IReproductiveEvent}
      animalId={id as string}
    />
  );
}
