import { z } from "zod";
import { reproductionDetailsSchema } from "../createAnimalSchema/subSchemas";
import { medicationsSchema } from "./subSchemas";

export const createReproductiveEventsSchema = z
  .object({
    reproduction_details: reproductionDetailsSchema,
    last_oestrus: z.string().optional(),
    medicated: z.boolean(),
    medication: medicationsSchema.optional().nullable(),
    application_date: z.string().optional(),
  })
  .refine((data) => !data.medicated || Boolean(data.medication), {
    path: ["medication"],
    message: "You should select a medication",
  });

type CreateReproductiveEventData = z.infer<
  typeof createReproductiveEventsSchema
>;

export type { CreateReproductiveEventData };
