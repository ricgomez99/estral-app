import { supabase } from "../supabase";
import { INotificationPayloadData } from "@/types/notifications";

export default async function sendReproductiveNotifications(
  payload: INotificationPayloadData,
) {
  const { data, error } = await supabase.functions.invoke(
    "send-reproductive-notifications",
    { body: payload },
  );

  console.log(data);

  if (error) {
    console.error(error);
    throw new Error(
      error.message ||
        "Error invoking Edge function: send-reproductive-notifications",
    );
  }

  return data;
}
