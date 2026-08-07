import * as WebBrowser from "expo-web-browser";
import { AuthService } from "@/services";
import { Button, Text, Row, Icon, RNHostView } from "@expo/ui";
import { useRef } from "react";
import { extractParamsFromUrl } from "@/utils/transformations";
import { AuthError } from "@supabase/supabase-js";
import Toast from "react-native-toast-message";
import { images } from "@/utils/consts";
import { Image } from "expo-image";

WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignInButton() {
  const inFlightRef = useRef(false);
  const lastUrlRef = useRef<string | null>(null);

  const onButtonPress = async () => {
    if (inFlightRef.current) return;

    inFlightRef.current = true;

    try {
      const result = await AuthService.signInWithGoogle();

      if (!result || result.type !== "success") {
        return;
      }

      if (lastUrlRef.current === result.url) {
        return;
      }
      lastUrlRef.current = result.url;

      const params = extractParamsFromUrl(result.url);

      if (!params.access_token || !params.refresh_token) {
        return;
      }

      await AuthService.setAuthSession(
        String(params.access_token),
        String(params.refresh_token),
      );
    } catch (error) {
      if (error instanceof AuthError) {
        console.error("Error signing in with Google: ", error);

        Toast.show({
          type: "error",
          text1: "Authentication Error",
          text2: error.message || "Unable to signin with google",
        });
      } else {
        console.error(error);
      }
    } finally {
      inFlightRef.current = false;
    }
  };

  return (
    <Button variant="filled" onPress={onButtonPress}>
      <Row spacing={12} alignment="center">
        <RNHostView matchContents>
          <Image source={images.googleLogo} style={{ width: 32, height: 32 }} />
        </RNHostView>

        <Text textStyle={{ fontSize: 16, fontWeight: "700" }}>
          Sign in with google
        </Text>
      </Row>
    </Button>
  );
}
