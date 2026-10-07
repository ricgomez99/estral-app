import { IAnimal } from "@/types/mock-types";
import useTabQuery from "./useTabQuery";
import { getAnimalById } from "@/lib/supabase-data-management/data-fetching";

export default function useGetAnimalById(animalId: string) {
  const {
    data: animal,
    isLoading,
    error,
    isRefetching,
    refetch,
  } = useTabQuery<IAnimal>({
    queryKey: ["animal", animalId],
    queryFn: () => getAnimalById(animalId),
    enabled: !!animalId,
  });

  return { animal, isLoading, error, isRefetching, refetch };
}
