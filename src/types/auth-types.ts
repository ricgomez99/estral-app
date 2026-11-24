import { VET_SPECIALTIES } from "@/utils/consts";
import { Session, User } from "@supabase/supabase-js";

export type UserRole = "vet" | "ranch_owner" | "admin";
export type LicenseStatus = "unverified" | "pending" | "verified" | "rejected";
export type VetSpecialty = (typeof VET_SPECIALTIES)[number];

export interface IProfile {
  id: string;
  updated_at: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  phone_number: string | null;
  email_address: string | null;
  is_onboarded: boolean;
}

export interface IVetDetailsRaw {
  id: string;
  profile_id: string;
  license_number: string;
  license_status: LicenseStatus;
  license_verified_at: string | null;
  vet_specialties: { specialty_code: string }[];
  created_at: string;
}

export interface IVetDetails {
  id: string;
  profile_id: string;
  license_number: string | null;
  license_status: LicenseStatus;
  created_at: string | null;
  specialties: VetSpecialty[];
}

export interface IRanchDetails {
  id: string;
  profile_id: string;
  ranch_name: string | null;
  location: string | null;
  capacity: number | null;
  created_at: string;
}

export interface IAuthState {
  session: Session | null;
  user: User | null;
  profile: IProfile | null;
  vetDetails: IVetDetailsRaw | null;
  ranchDetails: IRanchDetails | null;
  role: UserRole | null;
  isLoading: boolean;
  initialize: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

export interface IAppleSignInParams {
  identityToken: string;
  authorizationCode: string;
  nonce: string;
}

export type SignInErrorKind =
  | "invalid_credentials"
  | "email_not_confirmed"
  | "rate_limited"
  | "banned"
  | "unknown";

export type SignUpErrorKind =
  | "user_already_exists"
  | "phone_already_exists"
  | "weak_password"
  | "invalid_email"
  | "email_not_authorized"
  | "signup_disabled"
  | "provider_disabled"
  | "rate_limited"
  | "captcha_failed"
  | "validation_failed"
  | "server_error"
  | "network"
  | "unknown";
