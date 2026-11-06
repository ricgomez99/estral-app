import { supabase } from "@/lib";

export function resolveAvatarUrl(avatarUrl: string | null): string | null {
  if (!avatarUrl) return null;
  if (avatarUrl.startsWith("http")) return avatarUrl;

  return supabase.storage.from("avatars").getPublicUrl(avatarUrl).data
    .publicUrl;
}
