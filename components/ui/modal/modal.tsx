// components/ui/modal/universal-modal.tsx
import { TMessageTypes } from "@/constants/message-types";
import { ThemeConfigType } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-color";
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import ThemedText from "../themed-text";
import ThemedView from "../themed-view";

export type UniversalModalProps = {
    visible: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    onCancel?: () => void;
    type: TMessageTypes;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    showCancelButton?: boolean;
};

export default function UniversalModal({
    visible,
    onClose,
    onConfirm,
    onCancel,
    type,
    title,
    message,
    confirmText = "Aceptar",
    cancelText = "Cancelar",
    showCancelButton = true,
}: UniversalModalProps) {
    const themeColors = useThemeColors() as ThemeConfigType;

    // Colores según el tipo
    const getButtonColor = () => {
        switch (type) {
            case "success":
                return themeColors.semantic.success?.default || "#10B981";
            case "error":
                return themeColors.semantic.error?.default || "#EF4444";
            case "warning":
                return themeColors.semantic.warning?.default || "#F59E0B";
            case "info":
                return themeColors.semantic.info?.default || "#3B82F6";
            default:
                return "#3B82F6";
        }
    };

    const handleConfirm = () => {
        onConfirm ? onConfirm() : onClose();
    };

    const handleCancel = () => {
        onCancel ? onCancel() : onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback>
                        <ThemedView
                            style={[
                                {
                                    borderWidth: 2,
                                    borderColor: themeColors.background[100],
                                    borderRadius: 16,
                                    padding: 24,
                                    width: "100%",
                                    maxWidth: 400,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,
                                    elevation: 5,
                                },
                            ]}
                        >
                            <ThemedText
                                style={[
                                    {
                                        fontSize: 20,
                                        fontWeight: "bold",
                                        textAlign: "center",
                                    },
                                ]}
                            >
                                {title}
                            </ThemedText>
                            <View
                                style={{
                                    marginBlock: 10,
                                    borderBottomWidth: 2,
                                    borderColor: themeColors.background[100],
                                }}
                            ></View>
                            <ThemedText
                                style={[
                                    {
                                        fontSize: 16,
                                        marginBottom: 24,
                                        color: themeColors.text[500],
                                        textAlign: "center",
                                        lineHeight: 22,
                                    },
                                ]}
                            >
                                {message}
                            </ThemedText>

                            <View style={styles.buttonsContainer}>
                                {showCancelButton && (
                                    <TouchableOpacity
                                        style={[
                                            {
                                                paddingHorizontal: 20,
                                                paddingVertical: 10,
                                                borderRadius: 8,
                                                minWidth: 80,
                                                alignItems: "center",
                                                backgroundColor:
                                                    themeColors.background
                                                        .default,
                                                borderWidth: 2,
                                                borderColor:
                                                    themeColors.text[200],
                                            },
                                        ]}
                                        onPress={handleCancel}
                                    >
                                        <Text
                                            style={{
                                                color: themeColors.text.default,
                                                fontWeight: "600",
                                            }}
                                        >
                                            {cancelText}
                                        </Text>
                                    </TouchableOpacity>
                                )}

                                <TouchableOpacity
                                    
                                    style={[
                                        {
                                            paddingHorizontal: 20,
                                            paddingVertical: 10,
                                            borderRadius: 8,
                                            minWidth: 80,
                                            alignItems: "center",
                                            borderWidth: 2,
                                            borderColor: themeColors.text[200],
                                            backgroundColor: getButtonColor(),
                                        },
                                    ]}
                                    onPress={handleConfirm}
                                >
                                    <Text
                                        style={{
                                            color: themeColors.text[200],
                                            fontWeight: "600",
                                        }}
                                    >
                                        {confirmText}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </ThemedView>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 12,
    },
});
