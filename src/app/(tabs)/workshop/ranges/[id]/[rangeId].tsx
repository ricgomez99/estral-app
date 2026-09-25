import { UpdateRangeForm } from "@/components/Details/Forms";
import { useLocalSearchParams } from "expo-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import SpinLoader from "@/components/shared/SpinLoader";
import { IAnimal, IReproductiveEvent } from "@/types/mock-types";
import { getReproductiveEventById } from "@/lib/supabase-data-management/data-fetching";

export default function UpdateRangeScreen() {
  const queryClient = useQueryClient();
  const { id, rangeId } = useLocalSearchParams();
  const { data: range, isLoading } = useQuery({
    queryKey: ["range", id, rangeId],
    queryFn: async () =>
      await getReproductiveEventById(String(rangeId), String(id)),
    enabled: !!id && !!rangeId,
    initialData: () => {
      const animalCache = queryClient.getQueryData<IAnimal>([
        "animal-ranges",
        id,
      ]);
      return animalCache?.reproductive_events?.find(
        (range) => range.id === rangeId,
      );
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
