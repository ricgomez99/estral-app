import { z } from "zod";
import {
  speciesSchema,
  sexSchema,
  breedSchema,
  conditionSchema,
  reproductionDetailsSchema,
} from "./subSchemas";

export const createAnimalSchema = z.object({
  name: z.string().min(3, "Name should be at least 3 characters long"),
  age: z.coerce
    .number()
    .int("Age should be an integer")
    .nonnegative()
    .min(3, "The minimum age allowed is 3")
    .max(15, "The maximum age allowed is 15"),

  type: speciesSchema,
  sex: sexSchema,
  breed: breedSchema,
  condition: conditionSchema,
  reproduction_details: reproductionDetailsSchema.optional(),
  microchipId: z
    .string()
    .regex(/^[a-zA-Z0-9]+$/, "The chip id shloud be alphanumeric")
    .min(5, "The chip number should have at least 5 characters long")
    .max(12, "The max number of characters is 12")
    .optional(),
  isRecipient: z.boolean().optional(),
  isDonor: z.boolean().optional(),
  image: z.string().optional(),
  last_oestrus: z.string().min(1, "Last Oestrus date is required"),
});

type AnimalFormData = z.infer<typeof createAnimalSchema>;
type AnimalFormOutput = z.output<typeof createAnimalSchema>;
export type { AnimalFormData, AnimalFormOutput };
