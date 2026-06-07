import { getAnimalById } from "@/utils/mock-functions";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { UpdateAnimalForm } from "@/components/Details/Forms";

export default function UpdateAnimalScreen() {
  const { id } = useLocalSearchParams();
  const { data: subject, isLoading } = useQuery({
    queryKey: ["animal", Number(id)],
    queryFn: () => getAnimalById(Number(id)),
    enabled: !!id,
  });

  return <UpdateAnimalForm defaultData={subject} />;
}
