import { Session, User } from "@supabase/supabase-js";

export type UserRole = "vet" | "ranch_owner" | "admin";

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

export interface IVetDetails {
  id: string;
  profile_id: string;
  license_number: string;
  specialty: string | null;
  created_at: string;
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
  vetDetails: IVetDetails | null;
  ranchDetails: IRanchDetails | null;
  role: UserRole | null;
  isLoading: boolean;
  initialize: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}
