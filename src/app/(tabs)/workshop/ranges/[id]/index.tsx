import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getRangeById } from "@/utils/mock-functions";
import SpinLoader from "@/components/shared/SpinLoader";
import { DetailsLayout } from "@/layouts";
import { DateService } from "@/lib";

export default function RangeDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data: range, isLoading } = useQuery({
    queryKey: ["range", Number(id)],
    queryFn: () => getRangeById(Number(id)),
  });

  const handleUpdatePress = () => {
    router.push(`/workshop/ranges/${id}/update`);
  };

  const formattedMinDate = DateService.formatToLongDate(range?.min_date!, "en");
  const formattedMaxDate = DateService.formatToLongDate(range?.max_date!, "en");

  if (isLoading) {
    return <SpinLoader />;
  }

  return (
    <DetailsLayout handlePressUpdate={handleUpdatePress}>
      <View style={styles.container}>
        <Text>{formattedMinDate}</Text>
        <Text>{formattedMaxDate}</Text>
        <Text>{range?.subject.name}</Text>
      </View>
    </DetailsLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
