import { AppState, AppStateStatus, Platform } from "react-native";
import { useEffect } from "react";
import { focusManager } from "@tanstack/react-query";

export default function useAppStateFocus() {
  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      (status: AppStateStatus) => {
        if (Platform.OS !== "web") {
          focusManager.setFocused(status === "active");
        }
      },
    );
    return () => subscription.remove();
  }, []);
}
