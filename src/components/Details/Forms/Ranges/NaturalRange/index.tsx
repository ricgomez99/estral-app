import { IFertilityRange } from "@/types/mock-types";
import { Control, useWatch } from "react-hook-form";
import { StyleSheet } from "react-native";
import { calculateFertilityRange } from "@/services";
import { DateService } from "@/lib";
import InfoCard from "@/components/shared/InfoCard";
import { Row, Text } from "@expo/ui";

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
    <InfoCard>
      <Text textStyle={styles.mainMessage}>
        {`Range calculated based on the natural cycle using the last oestrus date: ${lastOestrus}`}
      </Text>

      <Row spacing={10}>
        <Row spacing={5}>
          <Text textStyle={styles.dateLabel}>Min Date:</Text>
          <Text textStyle={styles.date}>{formattedMinDate}</Text>
        </Row>
        <Row spacing={5}>
          <Text textStyle={styles.dateLabel}>Max Date:</Text>
          <Text textStyle={styles.date}>{formattedMaxDate}</Text>
        </Row>
      </Row>
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
