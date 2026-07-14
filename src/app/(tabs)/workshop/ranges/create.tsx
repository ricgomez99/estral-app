import { useLocalSearchParams } from "expo-router";
import { CreateRangeForm } from "@/components/Details/Forms";

export default function CreateRangeScreen() {
  const { animalId } = useLocalSearchParams<{ animalId: string }>();

  return <CreateRangeForm animalId={animalId} />;
}
