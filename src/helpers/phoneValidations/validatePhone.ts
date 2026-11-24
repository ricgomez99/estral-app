import { parsePhoneNumberFromString } from "libphonenumber-js/mobile";
import z from "zod";

export function parseNumber(value: string, ctx: z.core.$RefinementCtx<string>) {
  const parsed = parsePhoneNumberFromString(value);
  if (!parsed?.isValid()) {
    ctx.addIssue({
      code: "custom",
      message: "Enter a valid phone number including the country code",
    });

    return z.NEVER;
  }

  return parsed.number;
}
