import { NotificationsAdapter } from "@/helpers/notifications-adapter";
import { Platform } from "react-native";
import {
  AndroidImportance,
  Notification,
  NotificationResponse,
} from "expo-notifications";
import Constants from "expo-constants";
import * as Device from "expo-device";

const PushNotificationsService = (
  notifications: NotificationsAdapter = new NotificationsAdapter(),
) => {
  const configHandler = () => {
    notifications.setNotificationHandler();
  };

  const registerPushNotifications = async () => {
    if (!Device.isDevice) {
      console.warn("The notifications required a real device");
      return;
    }

    const channelProps = {
      channel: "default",
      props: {
        name: "default",
        importance: AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      },
    };
    let deffStatus: string;
    let projectId: string;

    if (Platform.OS === "android") {
      await notifications.setNotificationChannelAsync(
        channelProps.channel,
        channelProps.props,
      );
    }

    const { status: currentStatus } = await notifications.getPermissionsAsync();
    deffStatus = currentStatus;

    if (currentStatus !== "granted") {
      const { status } = await notifications.requestPermissionsAsync();
      deffStatus = status;
    }

    if (deffStatus !== "granted") {
      console.error("Unable to get permissions granted for push notifications");
      return;
    }

    projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;

    if (!projectId) {
      console.error("No Project ID found");
      return;
    }

    try {
      const pushToken = (
        await notifications.getExpoPushTokenAsync({
          projectId: projectId,
        })
      ).data;

      // Remove this for production
      console.log("[Expo Push Notifications Token]: ", pushToken);
      return pushToken;
    } catch (error) {
      console.error(error);
    }
  };

  const listenToReceiveNotification = (
    onNotificationReceived: (notification: Notification) => void,
  ) => {
    return notifications.addNotificationReceivedListener(
      onNotificationReceived,
    );
  };

  const listenToNotificationResponse = (
    onNotificationResponse: (response: NotificationResponse) => void,
  ) => {
    return notifications.addNotificationResponseReceivedListener(
      onNotificationResponse,
    );
  };

  return {
    configHandler,
    registerPushNotifications,
    listenToReceiveNotification,
    listenToNotificationResponse,
  };
};

export default PushNotificationsService;
