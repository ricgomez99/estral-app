import { SignUpErrorKind } from "@/types/auth-types";

export class SignUpError extends Error {
  constructor(
    public readonly kind: SignUpErrorKind,
    message: string,
  ) {
    super(message);
    this.name = "SignUpError";
  }
}
