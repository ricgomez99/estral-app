import { z } from "zod";

const medicationsSchema = z.enum(["gnrh", "progesterone"]);

export { medicationsSchema };
