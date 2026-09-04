import { supabase } from "@/lib/supabase";
import { useAuthStore, useNotificationsStore } from "@/stores";
import { useEffect } from "react";

export default function useSyncPushToken() {
  const { session } = useAuthStore();
  const { expoPushToken } = useNotificationsStore();

  useEffect(() => {
    const syncPushToken = async () => {
      if (!session?.user.id || !expoPushToken) return;
      const { error } = await supabase
        .from("profiles")
        .update({ expo_push_token: expoPushToken })
        .eq("id", session?.user?.id);

      if (error) {
        console.error(
          "Error while updating the expo_push_token column on Supabase: ",
          error,
        );
      } else {
        console.log("Expo Push Token syncronized successfully on supabase");
      }
    };

    syncPushToken();
  }, [session?.user.id, expoPushToken]);
}
