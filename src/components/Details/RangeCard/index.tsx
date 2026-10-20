import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import useCancelReproductiveCycle from "@/hooks/useCancelReproductiveCycle";
import BottomModal from "@/components/shared/BottomModal";
import { Button, Host, Text as UiText, Row, Picker } from "@expo/ui";
import { getReproductiveCycleId } from "@/lib/supabase-data-management/data-fetching";
import { cancelEventOptions } from "@/utils/consts";

interface ICardProps {
  min_date: string | undefined;
  max_date: string | undefined;
  creation_date: string | undefined;
  rangeId: string;
  animalId: string;
}

export default function RangeCard({
  min_date,
  max_date,
  creation_date,
  rangeId,
  animalId,
}: ICardProps) {
  const [isDeletePressed, setIsDeletePressed] = useState(false);
  const [cancellationReason, setCancellationReason] = useState("magement");

  const router = useRouter();
  const { mutateAsync: cancelCycle, isPending } = useCancelReproductiveCycle();

  const { width } = Dimensions.get("screen");

  const handlePressUpdate = () => {
    router.push(`/workshop/ranges/${animalId}/${rangeId}`);
  };

  const handlePressDelete = () => {
    setIsDeletePressed(true);
  };

  const handleConfirmation = async () => {
    try {
      const cycleId = await getReproductiveCycleId(String(rangeId));
      await cancelCycle({
        cycleId,
        animalId,
        reason: cancellationReason,
      });
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <>
      <View style={styles.card}>
        <View style={styles.cardDates}>
          <View style={styles.dateWrapper}>
            <Text style={styles.dateLabel}>Min Date:</Text>
            <Text style={styles.dateText}>{min_date}</Text>
          </View>
          <View style={styles.dateWrapper}>
            <Text style={styles.dateLabel}>Max Date:</Text>
            <Text style={styles.dateText}>{max_date}</Text>
          </View>
          <View style={styles.dateWrapper}>
            <Text style={styles.dateLabel}>Creation Date:</Text>
            <Text style={styles.dateText}>{creation_date}</Text>
          </View>
        </View>
        <View style={styles.actionButtons}>
          <Pressable style={styles.button} onPress={handlePressUpdate}>
            <Feather size={24} name="edit-2" color="#e1e1e1" />
          </Pressable>
          <Pressable style={styles.button} onPress={handlePressDelete}>
            <Feather size={24} name="x-circle" color="#e1e1e1" />
          </Pressable>
        </View>
      </View>
      {isDeletePressed && (
        <Host style={{ flex: 1 }}>
          <BottomModal
            isOpen={isDeletePressed}
            onClose={() => setIsDeletePressed(false)}>
            <UiText textStyle={{ fontSize: 16, color: "#474E68" }}>
              Do you want to cancel this event?
            </UiText>
            <Picker
              selectedValue={cancellationReason}
              onValueChange={setCancellationReason}>
              {cancelEventOptions.map((item) => (
                <Picker.Item
                  key={item.value}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </Picker>
            <Row alignment="center" spacing={12}>
              <Button
                onPress={handleConfirmation}
                style={{ width: width }}
                label="Confirm"
                disabled={isPending}
              />
            </Row>
          </BottomModal>
        </Host>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    padding: 12,
    gap: 6,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
  },
  cardDates: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    maxWidth: "70%",
    gap: 10,
  },

  dateWrapper: {
    flexDirection: "column",
    gap: 2,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#474E68",
  },

  actionButtons: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },

  button: {
    width: "auto",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
    backgroundColor: "#111",
    borderRadius: "100%",
    borderWidth: 1,
    borderColor: "#111",
  },
});
