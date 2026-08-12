import {
  appleAuthAndroid,
  AppleButton,
} from "@invertase/react-native-apple-authentication";

import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import { AuthService } from "@/services";
import Toast from "react-native-toast-message";
import { AuthError } from "@supabase/supabase-js";

export default function AppleSignInButton() {
  const onPressButton = async () => {
    try {
      const rawNonce = uuid();
      const state = uuid();

      appleAuthAndroid.configure({
        clientId: process.env.EXPO_PUBLIC_APPLE_AUTH_SERVICE_ID ?? "",
        redirectUri: process.env.EXPO_PUBLIC_APPLE_AUTH_REDIRECT_URI ?? "",
        responseType: appleAuthAndroid.ResponseType.ALL,
        scope: appleAuthAndroid.Scope.ALL,
        nonce: rawNonce,
        state,
      });

      const credentialState = await appleAuthAndroid.signIn();

      if (
        credentialState.id_token &&
        credentialState.code &&
        credentialState.nonce
      ) {
        await AuthService.signInWithApple({
          identityToken: credentialState.id_token,
          authorizationCode: credentialState.code,
          nonce: credentialState.nonce,
        });
      }
    } catch (error: unknown) {
      if (error instanceof AuthError) {
        console.error("Error signing in with Apple Android: ", error);
        Toast.show({
          type: "error",
          text1: "Authentication Error",
          text2: error.message || "Unable to signin with apple",
        });
      }
    }
  };
  return (
    <AppleButton
      buttonStyle={AppleButton.Style.BLACK}
      buttonType={AppleButton.Type.SIGN_IN}
      onPress={() => onPressButton()}
    />
  );
}
