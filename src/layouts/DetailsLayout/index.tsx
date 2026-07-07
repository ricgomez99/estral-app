import { View, StyleSheet } from "react-native";
import { PrimaryButton } from "@/components/shared/Buttons";
import { CustomHeader } from "@/components/Details";
import { Image } from "expo-image";
import { useRouter, HrefObject } from "expo-router";
import { Host } from "@expo/ui";

interface ILayoutProps {
  children: React.ReactNode;
  updateRoute?: string | HrefObject;
  imageSource: string | undefined;
  showUpdateButton?: boolean;
}

export default function DetailsLayout({
  children,
  updateRoute = "",
  imageSource,
  showUpdateButton = true,
}: ILayoutProps) {
  const router = useRouter();
  const handlePressUpdate = () => {
    router.push(updateRoute);
  };

  return (
    <View style={styles.detailsContainer}>
      <CustomHeader />
      <Image style={styles.image} source={imageSource} />
      {children}
      {showUpdateButton && (
        <Host style={{ flex: 1 }} matchContents>
          <PrimaryButton title="Update" handleClick={handlePressUpdate} />
        </Host>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    overflow: "scroll",
    flex: 1,
    marginHorizontal: 10,
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 5,
    marginVertical: 12,
  },
  image: {
    width: "100%",
    height: 200,
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
  },
});
