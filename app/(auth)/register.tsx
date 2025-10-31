import ThemedLogoHeaderBar from "@/components/ui/bar/themed-logo-header-bar";
import PasswordTextInput from "@/components/ui/input/input-password";
import TextInput from "@/components/ui/input/input-text";
import ThemedText from "@/components/ui/themed-text";
import ThemedView from "@/components/ui/themed-view";
import { ThemeConfigType } from "@/constants/theme";
import { useAuth } from "@/hooks//use-auth";
import { useModal } from "@/hooks/use-modal";
import { useThemeColors } from "@/hooks/use-theme-color";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
    },
    header: {
        alignItems: "flex-start",
        marginBottom: 40,
    },
    title: {
        textAlign: "center",
        marginBottom: 8,
    },
    subtitle: {
        textAlign: "center",
        color: "#666",
    },
    button: {
        backgroundColor: "#265373",
        height: 50,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20,
    },
    buttonDisabled: {
        backgroundColor: "#a0a0a0",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    loginLinkContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        gap: 5,
    },
    linkText: {
        color: "#265373",
        fontWeight: "600",
        textDecorationLine: "underline",
    },
    errorText: {
        color: "#e74c3c",
        fontSize: 14,
    },
    successText: {
        color: "#27ae60",
        fontSize: 14,
        marginBottom: 10,
        textAlign: "center",
    },
});

export default function RegisterScreen() {
    const themeColors = useThemeColors() as ThemeConfigType;
    const { signUp } = useAuth();
    const router = useRouter();
    const { showModal } = useModal();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        if (errors[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: "",
            }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.email.trim()) {
            newErrors.email = "El email es requerido";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "El formato del email es inválido";
        }

        if (!formData.password) {
            newErrors.password = "La contraseña es requerida";
        } else if (formData.password.length < 8) {
            newErrors.password =
                "La contraseña debe tener al menos 8 caracteres";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "La contraseña es requerida";
        } else if (formData.confirmPassword.length < 8) {
            newErrors.confirmPassword =
                "La contraseña debe tener al menos 8 caracteres";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Confirma tu contraseña";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Las contraseñas no coinciden";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async () => {
        try {
            setLoading(true);
            if (!validateForm()) return;
            await signUp(formData.email, formData.password);
            showModal({
                title: "Registro exitoso",
                message: "Te registro fue todo un exito",
                type: "info",
            });
            setFormData({
                email: "",
                password: "",
                confirmPassword: "",
            });

            router.back();
        } catch (error: any) {
            showModal({
                title: "Error al registrar",
                message: error.message,
                type: "info",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemedView style={{ flex: 1 }}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <ThemedLogoHeaderBar
                    title={"Crear cuenta"}
                ></ThemedLogoHeaderBar>
                <ThemedView style={styles.container}>
                    {/* Header */}
                    <View style={{ marginBottom: 10 }}>
                        <ThemedText
                            type="subtitle"
                            style={{ fontWeight: "bold" }}
                        >
                            Hola 😃!
                        </ThemedText>
                        <ThemedText
                            type="default"
                            style={{ color: "#818181ff" }}
                        >
                            Crea una nueva cuenta para continuar
                        </ThemedText>
                    </View>

                    {/* Form */}
                    <TextInput
                        style={[
                            { marginTop: 12 },
                            errors.email && { borderColor: "#e74c3c" },
                        ]}
                        placeholder="Correo electrónico"
                        placeholderTextColor="#999"
                        value={formData.email}
                        onChangeText={(value) =>
                            handleInputChange("email", value)
                        }
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    {errors.email && (
                        <ThemedText style={[styles.errorText]}>
                            {errors.email}
                        </ThemedText>
                    )}

                    <View style={{ marginTop: 12 }}>
                        <PasswordTextInput
                            style={[
                                errors.password && { borderColor: "#e74c3c" },
                            ]}
                            placeholder="Contraseña"
                            value={formData.password}
                            handlePasswordChange={(value) =>
                                handleInputChange("password", value)
                            }
                            secureTextEntry
                        />
                    </View>
                    {errors.password && (
                        <ThemedText style={styles.errorText}>
                            {errors.password}
                        </ThemedText>
                    )}

                    <View style={{ marginTop: 12 }}>
                        <PasswordTextInput
                            style={[
                                errors.confirmPassword && {
                                    borderColor: "#e74c3c",
                                },
                            ]}
                            placeholder="Confirmar contraseña"
                            value={formData.confirmPassword}
                            handlePasswordChange={(value) =>
                                handleInputChange("confirmPassword", value)
                            }
                            secureTextEntry
                        />
                    </View>
                    {errors.confirmPassword && (
                        <ThemedText style={styles.errorText}>
                            {errors.confirmPassword}
                        </ThemedText>
                    )}

                    <Pressable
                        style={[
                            styles.button,
                            loading && styles.buttonDisabled,
                        ]}
                        onPress={handleRegister}
                        disabled={loading}
                    >
                        <ThemedText style={styles.buttonText}>
                            {loading ? "Creando cuenta..." : "Crear cuenta"}
                        </ThemedText>
                    </Pressable>

                    {/* Login Link */}
                    <View style={styles.loginLinkContainer}>
                        <ThemedText type="default" style={{ color: "#666" }}>
                            ¿Ya tienes una cuenta?
                        </ThemedText>
                        <Pressable
                            onPress={() => {
                                router.back();
                            }}
                        >
                            <ThemedText
                                style={{
                                    color: themeColors.bar.background["100"],
                                    fontWeight: "600",
                                    textDecorationLine: "underline",
                                }}
                            >
                                Inicia sesión
                            </ThemedText>
                        </Pressable>
                    </View>
                </ThemedView>
            </ScrollView>
        </ThemedView>
    );
}
