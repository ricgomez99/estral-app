import { normalizeToJpeg } from "@/helpers/normalize/normalizeToJpeg";
import { supabase } from "@/lib";

export async function setUserAvatar(
  localUri: string,
  userId: string,
  previousPath?: string | null,
): Promise<string> {
  const jpegUri = await normalizeToJpeg(localUri, 512);
  const buffer = await (await fetch(jpegUri)).arrayBuffer();
  const path = `${userId}/${Date.now()}.jpg`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(path, buffer, {
      contentType: "image/jpeg",
      cacheControl: "31536000", // Immutable URL for 1 year
      upsert: false,
    });

  if (uploadError) throw uploadError;

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: path })
    .eq("id", userId);

  if (updateError) {
    await supabase.storage.from("avatars").remove([path]);
    throw updateError;
  }

  if (previousPath && !previousPath.startsWith("http")) {
    await supabase.storage.from("avatars").remove([previousPath]);
  }

  return path;
}
