// contexts/modal-context.ts
import Modal from '@/components/ui/modal/modal';
import { TMessageTypes } from '@/constants/message-types';
import React, { createContext, useState } from 'react';

interface ModalConfig {
  type: TMessageTypes;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  showCancelButton?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface ModalContextType {
  showModal: (config: ModalConfig) => void;
  hideModal: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const showModal = (config: ModalConfig) => {
    setModalConfig(config);
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
    setTimeout(() => setModalConfig(null), 300);
  };

  const handleConfirm = () => {
    modalConfig?.onConfirm?.();
    hideModal();
  };

  const handleCancel = () => {
    modalConfig?.onCancel?.();
    hideModal();
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      
      {modalConfig && (
        <Modal
          visible={isVisible}
          onClose={hideModal}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          type={modalConfig.type}
          title={modalConfig.title}
          message={modalConfig.message}
          confirmText={modalConfig.confirmText}
          cancelText={modalConfig.cancelText}
          showCancelButton={modalConfig.showCancelButton ?? true}
        />
      )}
    </ModalContext.Provider>
  );
};
