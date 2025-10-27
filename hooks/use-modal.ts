import { useContext } from "react";
import { ModalContext } from "./contexts/modal-context";

// Hook para usar modales
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within ModalProvider');
  }
  return context;
};
