import { getAnimalById } from "@/utils/mock-functions";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { UpdateAnimalForm } from "@/components/Details/Forms";

export default function UpdateAnimalScreen() {
  const { id } = useLocalSearchParams();
  const { data: subject, isLoading } = useQuery({
    queryKey: ["animal", id],
    queryFn: () => getAnimalById(id as string),
    enabled: !!id,
  });

  return <UpdateAnimalForm defaultData={subject} />;
}
