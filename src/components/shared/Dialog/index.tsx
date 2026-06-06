import { Modal } from "react-native";

interface IModalProps {
  children: React.ReactNode;
  visible: boolean;
  onClose: () => void;
  style: ModalStyles;
}

type ModalStyles = "fullScreen" | "pageSheet" | "formSheet" | "overFullScreen";

export default function Dialog({
  children,
  visible,
  onClose,
  style,
}: IModalProps) {
  return (
    <Modal
      transparent={false}
      visible={visible}
      animationType="slide"
      presentationStyle={style}
      onRequestClose={onClose}
      allowSwipeDismissal={true}>
      {children}
    </Modal>
  );
}
