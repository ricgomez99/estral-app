import z from "zod";
import { VET_SPECIALTIES } from "@/utils/consts";
import { licenseNumberSchema, phoneSchema, roleSchema } from "../fieldsSchemas";

export const profileStepSchema = z.object({
  role: roleSchema,
  phone_number: phoneSchema,
});

export const vetStepSchema = z.object({
  specialties: z
    .array(z.enum(VET_SPECIALTIES, { error: "Select a valid specialty" }))
    .min(1, "Select at least one specialty")
    .max(3, "You can select up to 3 specialties"),
  license_number: licenseNumberSchema,
});

export type ProfileStepInput = z.input<typeof profileStepSchema>;
export type ProfileStepOutput = z.output<typeof profileStepSchema>;
export type VetStepInput = z.input<typeof vetStepSchema>;
export type VetStepOutput = z.output<typeof vetStepSchema>;
