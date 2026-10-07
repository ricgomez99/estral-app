import { MarkType, ReproductiveEventType } from "../mock-types";

interface INotificationPayloadData {
  profile_id: string;
  animal_id?: string;
  animal_name?: string;
  event_id?: string;
  event_type?: ReproductiveEventType;
  mark_type?: MarkType | string;
  title: string;
  body: string;
}

interface INotificationFunctionResponse {
  success?: boolean;
  expoResponse?: unknown;
  error?: string;
}

interface INotificationOptions {
  enableReminder?: boolean;
  profileId: string;
  customTitle?: string;
  customBody?: string;
}

export {
  INotificationFunctionResponse,
  INotificationOptions,
  INotificationPayloadData,
};
