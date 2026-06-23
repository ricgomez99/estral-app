import { AppState, AppStateStatus, Platform } from "react-native";
import { useEffect, useRef } from "react";
import { focusManager } from "@tanstack/react-query";

export default function useAppStateFocus() {
  const isAppReady = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      isAppReady.current = true;
    }, 800);

    const subscription = AppState.addEventListener(
      "change",
      (status: AppStateStatus) => {
        if (Platform.OS !== "web") {
          isAppReady.current && focusManager.setFocused(status === "active");
        }
      },
    );
    return () => {
      clearTimeout(timer);
      subscription.remove();
    };
  }, []);
}
