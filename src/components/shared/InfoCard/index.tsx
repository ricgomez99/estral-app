import { Collapsible, Column } from "@expo/ui";
import { useState } from "react";

interface ICardProps {
  children: React.ReactNode;
}

export default function InfoCard({ children }: ICardProps) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Collapsible
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      label="Info"
      labelStyle={{ fontSize: 14, fontWeight: "700" }}>
      <Column spacing={10}>{children}</Column>
    </Collapsible>
  );
}
