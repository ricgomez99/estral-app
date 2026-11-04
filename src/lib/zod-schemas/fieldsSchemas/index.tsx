import z from "zod";
import { parseNumber } from "@/helpers/phoneValidations/validatePhone";
import { SIGN_UP_ROLES } from "@/utils/consts";

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email("Enter a valid email"));

const fullNameSchema = z
  .string()
  .trim()
  .min(5, "The name must have at least 5 characters")
  .max(100, "The name must not exceed 100 characters")
  .regex(
    /^\p{L}[\p{L}\s'’.-]*$/u,
    "The name can contain only letters, spaces, apostrophes, dots or hyphens",
  );

const passwordSchema = z
  .string()
  .min(8, "Password must contain at least 8 characters.")
  .max(32, "Password cannot exceed 32 characters.")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
  .regex(/[0-9]/, "Password must contain at least one number.")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character.",
  );

const phoneSchema = z
  .string()
  .trim()
  .min(1, "Phone number is required")
  .transform((value, ctx) => parseNumber(value, ctx));

const roleSchema = z.enum(SIGN_UP_ROLES, {
  error: "Select a valid role",
});

const licenseNumberSchema = z
  .string()
  .trim()
  .transform((value) => (value === "" ? undefined : value.toUpperCase()))
  .pipe(
    z
      .string()
      .min(3, "License number is too short")
      .max(30, "License number is too long")
      .regex(
        /^[A-Z0-9][A-Z0-9\-./ ]*$/,
        "Only letters, numbers, hyphens, dots, slashes and spaces are allowed",
      )
      .optional(),
  )
  .optional();

export {
  emailSchema,
  fullNameSchema,
  passwordSchema,
  phoneSchema,
  roleSchema,
  licenseNumberSchema,
};
