import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { HrefObject, Link } from "expo-router";

interface IProps {
  mainText: string | undefined;
  linkText: string | undefined;
  linkUrl: string | HrefObject;
  alignment: "center" | "start" | "end";
}

export default function HeadToLink({
  mainText,
  linkText,
  alignment,
  linkUrl,
}: IProps) {
  const directions: Record<string, ViewStyle["justifyContent"]> = {
    center: "center",
    start: "flex-start",
    end: "flex-end",
  };

  const direction = directions[alignment] && directions[alignment];

  return (
    <View style={[styles.section, { justifyContent: direction }]}>
      <Text style={styles.mainText}>{mainText}</Text>
      <Link href={linkUrl}>
        <Text style={styles.linkText}>{linkText}</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    marginVertical: 6,
  },
  mainText: {
    color: "#1e1e1e",
    fontSize: 16,
    fontWeight: "500",
  },
  linkText: {
    color: "#3A86FF",
    fontSize: 16,
    fontWeight: "500",
  },
});
