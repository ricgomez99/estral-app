import type { SignInErrorKind, SignUpErrorKind } from "@/types/auth-types";
import { AuthError, isAuthRetryableFetchError } from "@supabase/supabase-js";

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

export const mapSignUpError = (error: AuthError): SignUpErrorKind => {
  const codesMap: Record<string, SignUpErrorKind> = {
    user_already_exists: "user_already_exists",
    email_exists: "user_already_exists",
    phone_exists: "phone_already_exists",
    weak_password: "weak_password",
    email_address_invalid: "invalid_email",
    email_address_not_authorized: "email_not_authorized",
    signup_disabled: "signup_disabled",
    email_provider_disabled: "provider_disabled",
    anonymous_provider_disabled: "provider_disabled",
    over_email_send_rate_limit: "rate_limited",
    over_request_rate_limit: "rate_limited",
    over_sms_send_rate_limit: "rate_limited",
    captcha_failed: "captcha_failed",
    validation_failed: "validation_failed",
    bad_json: "validation_failed",
    unexpected_failure: "server_error",
    request_timeout: "network",
    hook_timeout: "server_error",
    hook_payload_over_size_limit: "server_error",
  };

  if (isAuthRetryableFetchError(error)) return "network";

  if (error.code && codesMap[error.code]) {
    return codesMap[error.code];
  }
  if (error.status === 429) return "rate_limited";
  if (error.status && error.status >= 500) return "server_error";
  return "unknown";
};
