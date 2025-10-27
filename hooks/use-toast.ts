import { useContext } from "react";
import { ToastContext } from "./contexts/toast-context";

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useModal must be used within ModalProvider');
  }
  return context;
};
