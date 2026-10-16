import { useLocalSearchParams } from "expo-router";
import { UpdateAnimalForm } from "@/components/Details/Forms";
import useGetAnimalById from "@/hooks/useGetAnimalById";

export default function UpdateAnimalScreen() {
  const { id } = useLocalSearchParams();
  const { animal } = useGetAnimalById(String(id));

  return <UpdateAnimalForm defaultData={animal} />;
}
