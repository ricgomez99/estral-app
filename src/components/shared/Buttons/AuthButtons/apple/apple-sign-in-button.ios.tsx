import {
  AppleButton,
  appleAuth,
} from "@invertase/react-native-apple-authentication";

import { AuthService } from "@/services";
import { AuthError } from "@supabase/supabase-js";
import Toast from "react-native-toast-message";

export default function AppleSignInButton() {
  const onPressButton = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      const isAuthorized = appleAuth.State.AUTHORIZED;
      const { identityToken, authorizationCode, nonce } =
        appleAuthRequestResponse;

      if (
        credentialState === isAuthorized &&
        identityToken &&
        authorizationCode
      ) {
        await AuthService.signInWithApple({
          authorizationCode,
          identityToken,
          nonce,
        });
      }
    } catch (error) {
      if (
        error instanceof AuthError &&
        error?.code === appleAuth.Error.CANCELED
      ) {
        return;
      }

      if (error instanceof AuthError) {
        console.error("Error signing in with Apple IOS: ", error);
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
      style={{ width: 160, height: 45 }}
      onPress={() => onPressButton()}
    />
  );
}
