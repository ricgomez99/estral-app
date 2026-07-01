import { IFertilityRange } from "@/types/mock-types";
import { Control, useWatch } from "react-hook-form";
import { Text, StyleSheet, View } from "react-native";
import { calculateFertilityRange } from "@/services";
import { DateService } from "@/lib";
import InfoCard from "@/components/shared/InfoCard";

interface IProps {
  control: Control<IFertilityRange>;
  lastOestrus: string | undefined;
}

export default function NaturalRange({ control, lastOestrus }: IProps) {
  const isMedicated = useWatch({ control, name: "medicated" });

  if (isMedicated || !lastOestrus) return null;

  const { minDate, maxDate } = calculateFertilityRange(
    lastOestrus as string,
    "natural",
  );

  const formattedMinDate = DateService.formatToStoredDate(minDate);
  const formattedMaxDate = DateService.formatToStoredDate(maxDate);

  return (
    <InfoCard cardTitle="Info">
      <Text style={styles.mainMessage}>
        {`Range calculated based on the natural cycle using the last oestrus date: `}

        <Text style={styles.date}>{lastOestrus}</Text>
      </Text>

      <View style={styles.rangeDates}>
        <View style={styles.rangeWrapper}>
          <Text style={styles.dateLabel}>Min Date:</Text>
          <Text style={styles.date}>{formattedMinDate}</Text>
        </View>
        <View style={styles.rangeWrapper}>
          <Text style={styles.dateLabel}>Max Date:</Text>
          <Text style={styles.date}>{formattedMaxDate}</Text>
        </View>
      </View>
    </InfoCard>
  );
}

const styles = StyleSheet.create({
  mainMessage: {
    fontSize: 14,
    color: "#474E68",
  },
  date: {
    color: "#111",
    fontWeight: "700",
    fontSize: 14,
  },
  rangeDates: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 20,
  },
  rangeWrapper: {
    flexDirection: "row",
    gap: 8,
  },
  dateLabel: {
    fontSize: 14,
    color: "#474E68",
    fontWeight: "500",
  },
});
