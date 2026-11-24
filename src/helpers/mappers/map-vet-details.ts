import { VET_SPECIALTIES } from "@/utils/consts";
import type {
  VetSpecialty,
  IVetDetails,
  IVetDetailsRaw,
} from "@/types/auth-types";

const isVetSpecialty = (value: string): value is VetSpecialty =>
  (VET_SPECIALTIES as readonly string[]).includes(value);

export function mapVetDetails(raw: IVetDetailsRaw): IVetDetails {
  const { vet_specialties, ...rest } = raw;

  return {
    ...rest,
    specialties: vet_specialties
      .map((s) => s.specialty_code)
      .filter(isVetSpecialty),
  };
}
