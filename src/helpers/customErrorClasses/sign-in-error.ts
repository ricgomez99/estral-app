import { SignInErrorKind } from "@/types/auth-types";

export class SignInError extends Error {
  constructor(
    public readonly kind: SignInErrorKind,
    message: string,
  ) {
    super(message);
    this.name = "SignInError";
  }
}
