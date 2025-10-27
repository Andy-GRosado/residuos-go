import { Colors } from "@/constants/theme";
import {
    Modal,
    ModalProps,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from "react-native";

export type SuccessModalProps = ModalProps & {
    onClose?: (...args: any[]) => any;
    onConfirm?: (...args: any[]) => any;
    onCancel?: (...args: any[]) => any;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
};

export default function SuccessModal({
    visible,
    onClose,
    onConfirm,
    onCancel,
    confirmText,
    cancelText,
    title,
    message,
}: SuccessModalProps) {
    const theme = useColorScheme() ?? "light";

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>

                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={onClose}
                        >
                            <Text style={styles.cancelButtonText}>
                                {cancelText}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.button,
                                {
                                    backgroundColor:
                                        Colors[theme].messages.info.default,
                                },
                            ]}
                            onPress={onConfirm}
                        >
                            <Text style={styles.confirmButtonText}>
                                {confirmText}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        backgroundColor: "white",
        borderRadius: 12,
        padding: 20,
        margin: 20,
        minWidth: 300,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    message: {
        fontSize: 16,
        marginBottom: 20,
        color: "#666",
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 12,
    },
    button: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 6,
    },
    cancelButton: {
        backgroundColor: "#f1f1f1",
    },
    confirmButton: {
        backgroundColor: "#007AFF",
    },
    cancelButtonText: {
        color: "#666",
    },
    confirmButtonText: {
        color: "white",
    },
});
