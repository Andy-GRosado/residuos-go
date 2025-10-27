import ErrorModal from '@/components/ui/modal/error-modal';
import InfoModal from '@/components/ui/modal/info-modal';
import SuccessModal from '@/components/ui/modal/success-modal';
import WarningModal from '@/components/ui/modal/warning-modal';
import { TMessageTypes } from '@/constants/message-types';
import React, { createContext, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';

type ModalType = TMessageTypes;

interface ModalConfig {
  type: ModalType;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  customComponent?: React.ComponentType<any>;
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
    setTimeout(() => setModalConfig(null), 300); // Wait for animation
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
          transparent
          animationType="none"
          onRequestClose={hideModal}
        >
          <View style={styles.overlay}>
            <View style={styles.modalContainer}>
              {modalConfig.type === 'success' && (
                <SuccessModal
                  title={modalConfig.title || 'Confirmación'}
                  message={modalConfig.message}
                  confirmText={modalConfig.confirmText || 'Confirmar'}
                  cancelText={modalConfig.cancelText || 'Cancelar'}
                  onConfirm={handleConfirm}
                  onCancel={handleCancel}
                  onClose={hideModal}
                />
              )}
              
              {modalConfig.type === 'error' && (
                <ErrorModal
                  title={modalConfig.title || 'Error'}
                  message={modalConfig.message}
                  confirmText={modalConfig.confirmText || 'Confirmar'}
                  cancelText={modalConfig.cancelText || 'Cancelar'}
                  onConfirm={handleConfirm}
                  onCancel={handleCancel}
                  onClose={hideModal}
                />
              )}

              {modalConfig.type === 'warning' && (
                <WarningModal
                  title={modalConfig.title || 'Advertencia'}
                  message={modalConfig.message}
                  confirmText={modalConfig.confirmText || 'Confirmar'}
                  cancelText={modalConfig.cancelText || 'Cancelar'}
                  onConfirm={handleConfirm}
                  onCancel={handleCancel}
                  onClose={hideModal}
                />
              )}

              {modalConfig.type === 'info' && (
                <InfoModal
                  title={modalConfig.title || 'Info'}
                  message={modalConfig.message}
                  confirmText={modalConfig.confirmText || 'Confirmar'}
                  cancelText={modalConfig.cancelText || 'Cancelar'}
                  onConfirm={handleConfirm}
                  onCancel={handleCancel}
                  onClose={hideModal}
                />
              )}
              
              {modalConfig.customComponent && (
                <modalConfig.customComponent onClose={hideModal} />
              )}
            </View>
          </View>
        </Modal>
      )}
    </ModalContext.Provider>
  );
};


const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    borderRadius: 12,
    padding: 20,
    margin: 20,
    minWidth: 300,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  cancelButton: {
    backgroundColor: '#f1f1f1',
  },
  confirmButton: {
    backgroundColor: '#007AFF',
  },
  cancelButtonText: {
    color: '#666',
  },
  confirmButtonText: {
    color: 'white',
  },
});
