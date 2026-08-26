import type { INotificationsStoreType } from "@/types/stores/notifications-store-types";
import { create, StoreApi } from "zustand";
import PushNotificationsService from "@/services/notifications/push-notifications-service";
import { NotificationsAdapter } from "@/helpers/notifications-adapter";

const initialStates = {
  expoPushToken: null,
  notification: null,
  response: null,
  error: null,
  isInitializing: false,
};

export const useNotificationsStore = create<INotificationsStoreType>((set) => ({
  ...initialStates,
  setExpoPushToken: (token) => set({ expoPushToken: token }),
  setNotification: (notification) => set({ notification: notification }),
  setResponse: (response) => set({ response }),
  clearStore: () => set(initialStates),

  initialize: async () => {
    set({ isInitializing: true, error: null });
    const pushService = PushNotificationsService(new NotificationsAdapter());
    pushService.configHandler();

    try {
      const token = await pushService.registerPushNotifications();
      if (token) {
        set({ expoPushToken: token });
      }
      const receivedSub = pushService.listenToReceiveNotification(
        (notification) => {
          set({ notification });
        },
      );
      const responseSub = pushService.listenToNotificationResponse(
        (response) => {
          set({ response });
        },
      );
      set({ isInitializing: false });
      return () => {
        receivedSub.remove();
        responseSub.remove();
      };
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Unknown Error while initializing notifications",
        isInitializing: false,
      });

      return undefined;
    }
  },
}));
