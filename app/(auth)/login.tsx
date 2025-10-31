// app/(auth)/login.tsx
import ThemedLogoHeaderBar from "@/components/ui/bar/themed-logo-header-bar";
import PrimaryButton from "@/components/ui/button/primary-button";
import EmailTextInput from "@/components/ui/input/input-email";
import PasswordTextInput from "@/components/ui/input/input-password";
import ThemedText from "@/components/ui/themed-text";
import ThemedView from "@/components/ui/themed-view";
import { neutralColors, ThemeConfigType } from "@/constants/theme";
import { useAuth } from "@/hooks/use-auth";
import { useModal } from "@/hooks/use-modal";
import { useThemeColors } from "@/hooks/use-theme-color";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

export default function LoginScreen() {
    const { signIn } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginButtonPressed, setLoginButtonPressed] =
        useState<boolean>(false);
    const router = useRouter();
    const themeColors = useThemeColors() as ThemeConfigType;
    const { showModal } = useModal();

    const handleLogin = async () => {
        setLoginButtonPressed(true);

        if (!email || !password) {
            showModal({
                title: "Campos vacios",
                message: "Llena todos los campos para iniciar sesión",
                type: "info",
            });
            return;
        }

        if (!email.includes("@")) {
            showModal({
                title: "Correo inválido",
                message: "El correo ingresado no es válido",
                type: "info",
            });
            return;
        }

        try {
            const user = await signIn(email, password);
            router.push("/(app)/map");
        } catch (error: any) {
            showModal({
                title: "Inicio de sesión fallido",
                message: "El email o contraseña no es correcto",
                type: "info",
            });
        } finally {
            setLoginButtonPressed(true);
        }
    };

    const handleGoogleLogin = () => {
        console.log("Google login");
        // Alert.alert("Google Login", "Iniciando sesión con Google...");
    };

    const handleFacebookLogin = () => {
        console.log("Facebook login");
        // login();
    };

    return (
        <ThemedView style={{ flex: 1 }}>
            <ThemedLogoHeaderBar title="Iniciar Sesión"></ThemedLogoHeaderBar>
            <View style={styles.container}>
                <View style={{ marginTop: 10, marginBottom: 30 }}>
                    <ThemedText type="subtitle" style={{ fontWeight: "bold" }}>
                        Bienvenido de nuevo 👋!
                    </ThemedText>
                    <ThemedText
                        type="default"
                        style={{ color: themeColors.text[500] }}
                    >
                        Inicia sesión, te estamos esperando
                    </ThemedText>
                </View>

                {/* Formulario de login tradicional */}
                <EmailTextInput value={email} onChangeText={setEmail} />
                <View style={{ marginTop: 4 }}>
                    <PasswordTextInput
                        initialPassword={password}
                        handlePasswordChange={setPassword}
                    />
                </View>

                <View style={{ marginTop: 24 }}>
                    <PrimaryButton onPressCallback={handleLogin}>
                        <ThemedText type={"defaultSemiBold"} style={{color: neutralColors[50]}}>
                            Ingresar
                        </ThemedText>
                    </PrimaryButton>
                </View>

                {/* Separador */}
                <View style={styles.separatorContainer}>
                    <View
                        style={{
                            ...styles.separatorLine,
                            backgroundColor: themeColors.text.default,
                        }}
                    />
                    <ThemedText style={styles.separatorText}>ó</ThemedText>
                    <View
                        style={{
                            ...styles.separatorLine,
                            backgroundColor: themeColors.text.default,
                        }}
                    />
                </View>

                {/* Botones de redes sociales */}
                <View style={styles.socialButtonsContainer}>
                    <Pressable
                        style={styles.socialButton}
                        onPress={handleGoogleLogin}
                    >
                        <View
                            style={{
                                ...styles.iconContainer,
                                borderColor: themeColors.text[400],
                            }}
                        >
                            <ThemedText style={styles.googleIcon}>G</ThemedText>
                        </View>
                        <ThemedText
                            style={{
                                ...styles.socialButtonText,
                                color: themeColors.background[200],
                            }}
                        >
                            Google
                        </ThemedText>
                    </Pressable>

                    <Pressable
                        style={styles.socialButton}
                        onPress={handleFacebookLogin}
                    >
                        <View
                            style={{
                                ...styles.iconContainer,
                                borderColor: themeColors.text[400],
                            }}
                        >
                            <ThemedText style={styles.facebookIcon}>
                                f
                            </ThemedText>
                        </View>
                        <ThemedText
                            style={{
                                ...styles.socialButtonText,
                                color: themeColors.background[200],
                            }}
                        >
                            Facebook
                        </ThemedText>
                    </Pressable>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 20,
                        gap: 5,
                    }}
                >
                    <ThemedText
                        type="default"
                        style={{ color: themeColors.text[500] }}
                    >
                        No tienes una cuenta?
                    </ThemedText>
                    <Link href="/(auth)/register" asChild>
                        <Pressable>
                            <ThemedText
                                style={{
                                    color: themeColors.bar.background[100],
                                    fontWeight: "600",
                                    textDecorationLine: "underline",
                                }}
                            >
                                Regístrate
                            </ThemedText>
                        </Pressable>
                    </Link>
                </View>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    socialButtonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 25,
        gap: 10,
    },
    socialButton: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        borderRadius: 8,
        borderWidth: 1,
        backgroundColor: "white",
        paddingHorizontal: 15,
        gap: 10,
    },
    socialButtonText: {
        fontSize: 16,
        fontWeight: "600",
    },
    separatorContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20,
    },
    separatorLine: {
        flex: 1,
        height: 1,
    },
    separatorText: {
        marginHorizontal: 10,
        fontSize: 14,
    },
    iconContainer: {
        width: 32,
        height: 32,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        borderWidth: 2,
        borderRadius: 16,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    googleIcon: {
        color: "#DB4437",
        fontWeight: "bold",
        fontSize: 16,
    },
    facebookIcon: {
        color: "#4267B2",
        fontWeight: "bold",
        fontSize: 16,
    },
});
