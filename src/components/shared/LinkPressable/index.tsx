import { Link } from "expo-router";
import { Pressable } from "react-native";

interface ILinkPressableProps {
  children: React.ReactNode;
  href: string;
}

export default function LinkPressable({ children, href }: ILinkPressableProps) {
  return (
    <Link href={href} asChild>
      <Pressable>{children}</Pressable>
    </Link>
  );
}
