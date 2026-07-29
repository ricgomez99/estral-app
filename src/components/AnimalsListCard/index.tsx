import { IAnimal } from "@/types/mock-types";
import Card from "../shared/Card";
import LinkPressable from "../shared/LinkPressable";
import { View, StyleSheet } from "react-native";
import { memo } from "react";
import LabeldText from "../shared/LabeldText";
import { DateService } from "@/lib";

interface ICardProps {
  animal: IAnimal;
}

const AnimalsListCard = memo(({ animal }: ICardProps) => {
  const ROUTE = `/workshop/animals/${animal.id}`;
  const formattedOuestrusDate = DateService.formatToLongDate(
    animal.last_oestrus,
    "en",
  );
  return (
    <LinkPressable href={ROUTE}>
      <Card
        cardTitle={animal.name}
        cardImage={animal.image}
        cardSubTitle={animal.type}>
        <View style={styles.cardBody}>
          <View style={styles.firstSection}>
            <LabeldText
              labelTitle="Age"
              text={animal.age}
              disposition="horizontal"
            />
            <LabeldText
              labelTitle="Condition"
              text={animal.condition}
              disposition="horizontal"
            />
          </View>
          <View style={styles.secondarySection}>
            <LabeldText
              labelTitle="Breed"
              text={animal.breed}
              disposition="horizontal"
            />
            <LabeldText
              labelTitle="Last Oestrus Date"
              text={formattedOuestrusDate}
              disposition="horizontal"
            />
          </View>
        </View>
      </Card>
    </LinkPressable>
  );
});

const styles = StyleSheet.create({
  cardBody: {
    alignItems: "flex-start",
    gap: 12,
    paddingHorizontal: 8,
  },
  firstSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  secondarySection: {
    gap: 5,
  },
});

export default AnimalsListCard;
