import { IAnimal } from "@/types/mock-types";
import useTabQuery from "./useTabQuery";
import { getAnimals } from "@/lib/supabase-data-management/data-fetching";

export default function useRawAnimalsData() {
  const {
    data: animals,
    isLoading,
    error,
    isRefetching,
    refetch,
  } = useTabQuery<IAnimal[]>({
    queryKey: ["animals"],
    queryFn: getAnimals,
  });

  return { animals, isLoading, error, isRefetching, refetch };
}
