import { Button, Row, Icon, Text } from "@expo/ui";
import { useAuthStore } from "@/stores";

export default function SignOutButton() {
  const { signOut } = useAuthStore();
  const onPressSignOut = async () => {
    await signOut();
  };
  return (
    <Button onPress={onPressSignOut}>
      <Row spacing={6} alignment="center">
        <Icon
          name={Icon.select({
            ios: "rectangle.portrait.and.arrow.right.fill",
            android: require("@expo/material-symbols/logout.xml"),
          })}
          size={16}
          color="#FFFFFF"
        />
        <Text textStyle={{ color: "#FFFFFF" }}>Sign Out</Text>
      </Row>
    </Button>
  );
}
