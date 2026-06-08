import { UpdateRangeForm } from "@/components/Details/Forms";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getRangeById } from "@/utils/mock-functions";

export default function UpdateRangeScreen() {
  const { id } = useLocalSearchParams();
  const { data: range } = useQuery({
    queryKey: ["range"],
    queryFn: () => getRangeById(Number(id)),
  });

  return <UpdateRangeForm defaultAnimal={range?.subject.name} />;
}
