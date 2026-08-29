import { MarkType, ReproductiveEventType } from "../mock-types";

interface INotificationPayload {
  to: string;
  sound: string;
  title: string;
  body: string;
  data: INotificationPayloadData;
}

interface INotificationPayloadData {
  notification_id: string;
  animal_id: string;
  animal_name: string;
  event_id: string;
  event_type: ReproductiveEventType;
  mark_type: MarkType;
  screen?: string;
}

export type { INotificationPayload, INotificationPayloadData };
