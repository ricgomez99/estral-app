import * as WebBrowser from "expo-web-browser";
import { AuthService } from "@/services";
import { Button, Text, Row, RNHostView } from "@expo/ui";
import { useRef } from "react";
import { AuthError } from "@supabase/supabase-js";
import Toast from "react-native-toast-message";
import { images } from "@/utils/consts";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { statusCodes } from "@react-native-google-signin/google-signin";

WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignInButton() {
  const inFlightRef = useRef(false);
  const lastUrlRef = useRef<string | null>(null);
  const router = useRouter();

  const onButtonPress = async () => {
    if (inFlightRef.current) return;

    inFlightRef.current = true;

    try {
      const data = await AuthService.signInWithGoogle();

      if (data?.session) {
        router.replace("/(tabs)");
      }
    } catch (error: any) {
      if (error?.code === statusCodes.SIGN_IN_CANCELLED) return;
      console.error("Error signing in with Google:", error);

      const isAuthError = error instanceof AuthError;
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unable to sign in with google auth";
      Toast.show({
        type: "error",
        text1: isAuthError ? "Authentication Error" : "Unexpected Error",
        text2: errorMessage,
      });
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
