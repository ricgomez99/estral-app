import { supabase } from "@/lib/supabase";
import * as crypto from "expo-crypto";

/**
 * Uploads a local image to the supabase bucket 'animals'
 * @param localUri URI obtained from the ImagePicker
 * @param userId Authenticated user ID
 * @returns Promise<string> public image URL stored in supabase
 **/

export async function uploadAnimalImage(
  localUri: string,
  userId: string,
): Promise<string> {
  try {
    const fileExt = localUri.split(".").pop()?.toLowerCase() ?? "jpg";
    const uniqueId = crypto.randomUUID();
    const filePath = `avatars/${userId}/${uniqueId}.${fileExt}`;

    const response = await fetch(localUri);
    const blob = await response.blob();

    const { error: uploadError } = await supabase.storage
      .from("animals")
      .upload(filePath, blob, {
        contentType: `image/${fileExt === "png" ? "png" : "jpeg"}`,
        upsert: false,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = await supabase.storage
      .from("animals")
      .getPublicUrl(filePath);
    return data.publicUrl;
  } catch (error) {
    console.error("[uploadAnimalImage Error]: ", error);
    throw new Error("Unable to upload animal image into bucket");
  }
}
