import * as Notifications from "expo-notifications";
import type {
  NotificationChannelInput,
  NotificationPermissionsStatus,
  NotificationResponse,
  Notification,
  ExpoPushToken,
  NotificationChannel,
  EventSubscription,
} from "expo-notifications";

interface INotificationsProcessor {
  setNotificationHandler(): void;
  setNotificationChannelAsync(
    channel: string,
    channelProps: NotificationChannelInput,
  ): Promise<NotificationChannel | null>;
  getPermissionsAsync(): Promise<NotificationPermissionsStatus>;
  requestPermissionsAsync(): Promise<NotificationPermissionsStatus>;
  getExpoPushTokenAsync(props: IGetExpoPushTokenProps): Promise<ExpoPushToken>;
  addNotificationReceivedListener(
    listener: (notification: Notification) => void,
  ): EventSubscription;
  addNotificationResponseReceivedListener(
    listener: (response: NotificationResponse) => void,
  ): EventSubscription;
}

interface IHandleNotificationPayload {
  shouldPlaySound: boolean;
  shouldSetBadge: boolean;
  shouldShowBanner: boolean;
  shouldShowList: boolean;
  shouldShowAlert: boolean;
}

interface IGetExpoPushTokenProps {
  projectId: string;
}

export class NotificationsAdapter implements INotificationsProcessor {
  constructor(
    private readonly notificationsAPI: typeof Notifications = Notifications,
  ) {}

  setNotificationHandler() {
    this.notificationsAPI.setNotificationHandler({
      handleNotification: async (): Promise<IHandleNotificationPayload> => ({
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
        shouldShowAlert: true,
      }),
    });
  }

  addNotificationReceivedListener(
    listener: (notification: Notification) => void,
  ) {
    return this.notificationsAPI.addNotificationReceivedListener(listener);
  }

  addNotificationResponseReceivedListener(
    listener: (response: NotificationResponse) => void,
  ) {
    return this.notificationsAPI.addNotificationResponseReceivedListener(
      listener,
    );
  }

  async setNotificationChannelAsync(
    channel: string,
    channelProps: NotificationChannelInput,
  ) {
    return await this.notificationsAPI.setNotificationChannelAsync(
      channel,
      channelProps,
    );
  }

  async getPermissionsAsync() {
    return await this.notificationsAPI.getPermissionsAsync();
  }

  async requestPermissionsAsync() {
    return await this.notificationsAPI.requestPermissionsAsync();
  }

  async getExpoPushTokenAsync(props: IGetExpoPushTokenProps) {
    return await this.notificationsAPI.getExpoPushTokenAsync(props);
  }
}
