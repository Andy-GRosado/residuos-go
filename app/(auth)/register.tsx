// app/(auth)/register.tsx
import { ThemedText } from "@/app-example/components/themed-text";
import { ThemedView } from "@/app-example/components/themed-view";
import ThemedLogoHeader from "@/components/ui/themed-logo-header";
import { useAuth } from "@/contexts/auth-context";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    TextInput,
    View,
} from "react-native";

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
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
        color: "#ddd",
    },
    button: {
        backgroundColor: "#265373",
        height: 50,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
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
        marginBottom: 10,
        textAlign: "center",
    },
    successText: {
        color: "#27ae60",
        fontSize: 14,
        marginBottom: 10,
        textAlign: "center",
    },
});

export default function RegisterScreen() {
    const { signUp } = useAuth();
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
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

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: "",
            }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = "El nombre es requerido";
        }

        if (!formData.email.trim()) {
            newErrors.email = "El email es requerido";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "El formato del email es inválido";
        }

        if (!formData.password) {
            newErrors.password = "La contraseña es requerida";
        } else if (formData.password.length < 6) {
            newErrors.password =
                "La contraseña debe tener al menos 6 caracteres";
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
        if (!validateForm()) return;

        setLoading(true);
        try {
            await signUp(formData.email, formData.password);

            Alert.alert(
                "Éxito",
                "Cuenta creada. Revisa tu email para confirmar la cuenta.",
                [
                    {
                        text: "OK",
                        onPress: () => router.push("/(auth)/login"),
                    },
                ]
            );
        } catch (error: any) {
            Alert.alert("Error", error.message || "Error al crear la cuenta");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemedView
            style={{ flex: 1 }}
            lightColor="#265373"
            darkColor="#16354b"
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <ThemedLogoHeader title={"Crear cuenta"}></ThemedLogoHeader>
                <ThemedView style={styles.container}>
                    {/* Header */}
                    <View style={{ marginBottom: 30 }}>
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
                            styles.input,
                            errors.name && { borderColor: "#e74c3c" },
                        ]}
                        placeholder="Nombre completo"
                        placeholderTextColor="#999"
                        value={formData.name}
                        onChangeText={(value) =>
                            handleInputChange("name", value)
                        }
                        autoCapitalize="words"
                    />
                    {errors.name && (
                        <ThemedText style={styles.errorText}>
                            {errors.name}
                        </ThemedText>
                    )}

                    <TextInput
                        style={[
                            styles.input,
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
                        <ThemedText style={styles.errorText}>
                            {errors.email}
                        </ThemedText>
                    )}

                    <TextInput
                        style={[
                            styles.input,
                            errors.password && { borderColor: "#e74c3c" },
                        ]}
                        placeholder="Contraseña"
                        placeholderTextColor="#999"
                        value={formData.password}
                        onChangeText={(value) =>
                            handleInputChange("password", value)
                        }
                        secureTextEntry
                    />
                    {errors.password && (
                        <ThemedText style={styles.errorText}>
                            {errors.password}
                        </ThemedText>
                    )}

                    <TextInput
                        style={[
                            styles.input,
                            errors.confirmPassword && {
                                borderColor: "#e74c3c",
                            },
                        ]}
                        placeholder="Confirmar contraseña"
                        placeholderTextColor="#999"
                        value={formData.confirmPassword}
                        onChangeText={(value) =>
                            handleInputChange("confirmPassword", value)
                        }
                        secureTextEntry
                    />
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
                        <Link href="/(auth)/login" asChild>
                            <Pressable>
                                <ThemedText
                                    style={{
                                        color: "#265373",
                                        fontWeight: "600",
                                        textDecorationLine: "underline",
                                    }}
                                >
                                    Inicia sesión
                                </ThemedText>
                            </Pressable>
                        </Link>
                    </View>
                </ThemedView>
            </ScrollView>
        </ThemedView>
    );
}

{
    /* 

<KeyboardAvoidingView
    style={{...styles.container, backgroundColor: "#265373"}}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
>    
</KeyboardAvoidingView> 

*/
}
