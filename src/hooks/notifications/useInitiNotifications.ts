import { useAuthStore, useNotificationsStore } from "@/stores";
import { useEffect } from "react";

export default function useInitNotifications() {
  const { session } = useAuthStore();
  const { initialize: initializeNotifications } = useNotificationsStore();
  useEffect(() => {
    let cleanUp: (() => void) | undefined;

    const setup = async () => {
      if (!!session) {
        cleanUp = await initializeNotifications();
      }
    };

    setup();

    return () => {
      if (cleanUp) cleanUp();
    };
  }, [initializeNotifications, session]);
}
