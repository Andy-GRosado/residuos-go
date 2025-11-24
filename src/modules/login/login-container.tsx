import ThemedLogoHeaderBar from "@/src/shared/components/themed-logo-header-bar";
import ThemedText from "@/src/shared/components/themed-text";
import ThemedView from "@/src/shared/components/themed-view";
import { useAuth } from "@/src/shared/hooks/use-auth";
import { useThemeColors } from "@/src/shared/hooks/use-theme-color";
import { ThemeConfigType } from "@/src/store/theme";
import { Link } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { LoginForm } from "./components/login-form";

export function LoginContainer() {
    const themeColors = useThemeColors() as ThemeConfigType;
    const { profile } = useAuth()

    const handleGoogleLogin = () => {
        console.log("Google login");
        // Alert.alert("Google Login", "Iniciando sesión con Google...");
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
                        style={{ color: themeColors.text[500] }}
                    >
                        Inicia sesión, te estamos esperando
                    </ThemedText>
                </View>

                {/* Formulario de login tradicional */}
                <LoginForm />

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
                        style={{ color: themeColors.text[500] }}
                    >
                        No tienes una cuenta?
                    </ThemedText>
                    <Link href="/register" asChild>
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
