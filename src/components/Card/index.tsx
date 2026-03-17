import { Animal } from "@/types/mock-types";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";

type CardProps = Partial<Animal>;

export default function Card(props: CardProps) {
  return (
    <>
      <View style={styles.cardContainer}>
        <View style={styles.cardHeader}>
          <Image style={styles.cardImage} source={props.image} />
          <View style={styles.headerText}>
            <Text>{props.name}</Text>
            <Text>Type: {props.type}</Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#989898",
    backgroundColor: "#f9f9f9",
    padding: 5,
    gap: 8,
    marginHorizontal: 5,
    marginVertical: 8,
  },

  cardHeader: {
    justifyContent: "flex-start",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },

  cardImage: {
    objectFit: "cover",
    width: 50,
    height: 50,
    borderRadius: 12,
  },

  headerText: {
    gap: 5,
  },
});
