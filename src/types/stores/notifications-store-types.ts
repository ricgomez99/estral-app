import type { Notification, NotificationResponse } from "expo-notifications";

interface INotificationsStoreType {
  expoPushToken: string | null;
  notification: Notification | null;
  response: NotificationResponse | null;
  error: string | null;
  isInitializing: boolean;
  setExpoPushToken: (token: string | null) => void;
  setNotification: (notification: Notification | null) => void;
  setResponse: (response: NotificationResponse | null) => void;
  clearStore: () => void;
  initialize: () => Promise<(() => void) | undefined>;
}

export type { INotificationsStoreType };
