import { UpdateRangeForm } from "@/components/Details/Forms";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getRangeById } from "@/utils/mock-functions";
import SpinLoader from "@/components/shared/SpinLoader";
import { useQueryClient } from "@tanstack/react-query";
import { IAnimal } from "@/types/mock-types";

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
      return animalCache?.fertility_ranges.find(
        (range) => range.id === rangeId,
      );
    },
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <SpinLoader />;
  }

  return <UpdateRangeForm defaultData={range} animalId={id as string} />;
}
