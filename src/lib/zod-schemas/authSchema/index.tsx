import z from "zod";

export const authSchema = z.object({
  email: z.email("Invalid email address."),
  password: z.string().min(1, { message: "Password is required." }),
});

type LoginFormValues = z.infer<typeof authSchema>;
export type { LoginFormValues };
