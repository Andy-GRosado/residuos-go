// app/(auth)/login.tsx
import { ThemedText } from "@/app-example/components/themed-text";
import { ThemedView } from "@/app-example/components/themed-view";
import PasswordInput from "@/app-example/components/ui/password-input";
import ThemedLogoHeader from "@/components/ui/themed-logo-header";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/contexts/auth-context";
import { supabase } from "@/utils/supabase";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, TextInput, useColorScheme, View } from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        textAlign: "center",
        paddingTop: 40,
        paddingBottom: 40,
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
        // backgroundColor: "#265373",
        height: 50,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    // Nuevos estilos para botones sociales
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
        borderColor: "#ddd",
        backgroundColor: "white",
        paddingHorizontal: 15,
        gap: 10,
    },
    socialButtonText: {
        // color: "#202020ff",
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
        backgroundColor: "#ddd",
    },
    separatorText: {
        marginHorizontal: 10,
        color: "#666",
        fontSize: 14,
    },
    iconContainer: {
        width: 32,
        height: 32,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        borderWidth: 2,
        // borderColor: "#ebebebff",
        borderRadius: 16,
        // Shadow para iOS
        // shadowColor: "#000000ff",
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

export default function LoginScreen() {
    const {signIn} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoginButtonPressed, setLoginButtonPressed] = useState<boolean>(false)
    const router = useRouter();

    const theme = useColorScheme() as 'light' | 'dark';

    const handleLogin = async () => {
        setLoginButtonPressed(true)
        // Validación básica
        if (!email || !password) {
            Alert.alert("Error", "Por favor completa todos los campos");
            return;
        }

        // Aquí iría tu lógica de autenticación real
        console.log("Login attempt:", { email, password });

        // Simular login exitoso
        try {
            const user = await signIn(email, password);
            console.log(user);
            router.push("/(app)/map")
        } catch (error: any) {
            Alert.alert("Error", error.message);
        } finally {
            setLoginButtonPressed(true)
        }
    };

    const handleGoogleLogin = () => {
        supabase.from("");
        console.log("Google login");
        // Aquí integrarías con Google Sign-In
        // Por ahora simulamos login exitoso
        Alert.alert("Google Login", "Iniciando sesión con Google...");
        // login();
    };

    const handleFacebookLogin = () => {
        console.log("Facebook login");
        // Aquí integrarías con Facebook Login
        // Por ahora simulamos login exitoso
        Alert.alert("Facebook Login", "Iniciando sesión con Facebook...");
        // login();
    };

    return (
        <ThemedView style={{ flex: 1 }}>
            <ThemedLogoHeader title="Iniciar Sesión"></ThemedLogoHeader>
            <View style={styles.container}>
                <View style={{ marginBottom: 30 }}>
                    <ThemedText type="subtitle" style={{ fontWeight: "bold" }}>
                        Bienvenido de nuevo 👋!
                    </ThemedText>
                    <ThemedText type="default" style={{ color: "#818181ff" }}>
                        Inicia sesión, te estamos esperando
                    </ThemedText>
                </View>

                {/* Formulario de login tradicional */}
                <TextInput
                    style={styles.input}
                    placeholder="Correo electrónico"
                    placeholderTextColor={"#999"}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />

                <PasswordInput />
                {/* <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    placeholderTextColor={"#999"}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                /> */}

                <Pressable style={{...styles.button, backgroundColor: isLoginButtonPressed ? Colors[theme].bar_background_200 : Colors[theme].bar_background_100}} onPress={handleLogin}>
                    <ThemedText style={styles.buttonText}>Ingresar</ThemedText>
                </Pressable>

                {/* Separador */}
                <View style={styles.separatorContainer}>
                    <View style={styles.separatorLine} />
                    <ThemedText style={styles.separatorText}>o</ThemedText>
                    <View style={styles.separatorLine} />
                </View>

                {/* Botones de redes sociales */}
                <View style={styles.socialButtonsContainer}>
                    <Pressable
                        style={styles.socialButton}
                        onPress={handleGoogleLogin}
                    >
                        <View style={styles.iconContainer}>
                            <ThemedText style={styles.googleIcon}>G</ThemedText>
                        </View>
                        <ThemedText style={styles.socialButtonText}>
                            Google
                        </ThemedText>
                    </Pressable>

                    <Pressable
                        style={styles.socialButton}
                        onPress={handleFacebookLogin}
                    >
                        <View style={styles.iconContainer}>
                            <ThemedText style={styles.facebookIcon}>
                                f
                            </ThemedText>
                        </View>
                        <ThemedText style={styles.socialButtonText}>
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
                    <ThemedText type="default" style={{ color: "#666" }}>
                        No tienes una cuenta?
                    </ThemedText>
                    <Link href="/(auth)/register" asChild>
                        <Pressable>
                            <ThemedText
                                style={{
                                    color: "#265373",
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
