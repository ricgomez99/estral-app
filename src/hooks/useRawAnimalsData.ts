import { IAnimal } from "@/types/mock-types";
import useTabQuery from "./useTabQuery";
import { getAnimalsMock } from "@/utils/mock-functions";

export default function useRawAnimalsData() {
  const {
    data: animals,
    isLoading,
    error,
    isRefetching,
    refetch,
  } = useTabQuery<IAnimal[]>({
    queryKey: ["animals"],
    queryFn: getAnimalsMock,
  });

  return { animals, isLoading, error, isRefetching, refetch };
}
