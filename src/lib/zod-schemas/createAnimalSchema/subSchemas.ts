import { BREEDS, MIXES } from "@/utils/consts";
import { z } from "zod";

const speciesSchema = z.enum(["horse", "donkey", "zebra"]);
const sexSchema = z.enum(["Male", "Female"]);
const conditionSchema = z.enum(["Young Female", "Pregnant", "Not Pregnant"]);
const breedSchema = z.enum([...BREEDS, ...MIXES], "Breed is required");

const naturalReproductionSchema = z.object({
  type: z.literal("natural"),
  date: z.string().min(1, "Date is required"),
});

const inseminationReproductionSchema = z.object({
  type: z.literal("insemination"),
  date: z.string().min(1, "Date is required"),
});

const transferReproductionSchema = z.object({
  type: z.literal("transfer"),
  date: z.string().min(1, "Date is required"),
  embryon_days: z.coerce
    .number()
    .min(1, "The minimun days value is 1")
    .nonnegative(),
});

const reproductionDetailsSchema = z.discriminatedUnion("type", [
  naturalReproductionSchema,
  inseminationReproductionSchema,
  transferReproductionSchema,
]);

export {
  speciesSchema,
  sexSchema,
  conditionSchema,
  breedSchema,
  naturalReproductionSchema,
  inseminationReproductionSchema,
  transferReproductionSchema,
  reproductionDetailsSchema,
};
