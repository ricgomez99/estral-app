import type { SignInErrorKind } from "@/types/auth-types";
import { AuthError } from "@supabase/supabase-js";

export const mapAuthError = (error: AuthError): SignInErrorKind => {
  if (!error.code) return "unknown";

  const codesMap: Record<string, SignInErrorKind> = {
    invalid_credentials: "invalid_credentials",
    email_not_confirmed: "email_not_confirmed",
    over_request_rate_limit: "rate_limited",
    user_banned: "banned",
  };

  if (codesMap[error.code]) {
    return codesMap[error.code] as SignInErrorKind;
  }

  return error.status === 429 ? "rate_limited" : "unknown";
};
