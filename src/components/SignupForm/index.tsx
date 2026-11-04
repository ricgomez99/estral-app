import { View } from "react-native";
import RegularInput from "../Auth/Inputs/RegularInput";
import PasswordInput from "../Auth/Inputs/Password";
import { useForm } from "react-hook-form";
import {
  RegisterInput,
  RegisterOutput,
  registerSchema,
} from "@/lib/zod-schemas/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignupForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput, unknown, RegisterOutput>({
    resolver: zodResolver(registerSchema),
    defaultValues: undefined,
  });

  return (
    <View style={{ flex: 1, flexDirection: "column", gap: 20 }}>
      <RegularInput
        control={control}
        controllerName="full_name"
        label="Name"
        type="text"
        placeHolder="John Doe"
      />
      <RegularInput
        control={control}
        controllerName="email"
        label="Email"
        type="email"
        placeHolder="example@gmail.com"
      />
      <PasswordInput control={control} controllerName="password" />
    </View>
  );
}
