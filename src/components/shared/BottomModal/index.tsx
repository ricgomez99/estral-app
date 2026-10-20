import { BottomSheet, Column } from "@expo/ui";
import { Dimensions } from "react-native";

interface IModalProps {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
}
export default function BottomModal({
  children,
  onClose,
  isOpen,
}: IModalProps) {
  const { width } = Dimensions.get("screen");
  return (
    <BottomSheet isPresented={isOpen} onDismiss={onClose}>
      <Column
        spacing={12}
        alignment="center"
        style={{ width: width, padding: 10 }}>
        {children}
      </Column>
    </BottomSheet>
  );
}
