import { View, StyleSheet } from "react-native";
import { PrimaryButton } from "@/components/shared/Buttons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CustomHeader } from "@/components/Details";

interface ILayoutProps {
  children: React.ReactNode;
  handlePressUpdate: () => void;
}

export default function DetailsLayout({
  children,
  handlePressUpdate,
}: ILayoutProps) {
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.detailsContainer, { marginTop: top > 0 ? top : 10 }]}>
      <CustomHeader />
      {children}
      <View style={styles.buttonsContainer}>
        <PrimaryButton
          title="Update"
          handleClick={handlePressUpdate}
          type="normal"
        />
      </View>
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
});
