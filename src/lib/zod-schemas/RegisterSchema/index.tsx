import z from "zod";
import { emailSchema, fullNameSchema, passwordSchema } from "../fieldsSchemas";

const registerSchema = z.object({
  full_name: fullNameSchema,
  email: emailSchema,
  password: passwordSchema,
});

type RegisterInput = z.input<typeof registerSchema>;
type RegisterOutput = z.output<typeof registerSchema>;

export { type RegisterInput, type RegisterOutput, registerSchema };
