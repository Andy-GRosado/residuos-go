import { AuthProvider } from "@/hooks/contexts/auth-context";
import { ModalProvider } from "@/hooks/contexts/modal-context";
import { ToastProvider } from "@/hooks/contexts/toast-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";

export default function RootLayout() {
    const color_scheme = useColorScheme();

    return (
        <ThemeProvider
            value={color_scheme === "dark" ? DarkTheme : DefaultTheme}
        >
            <ModalProvider>
                <ToastProvider>
                    <AuthProvider>
                        <Stack>
                            <Stack.Screen
                                name="index"
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="(auth)"
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="(app)"
                                options={{ headerShown: false }}
                            />
                        </Stack>
                    </AuthProvider>
                </ToastProvider>
            </ModalProvider>
        </ThemeProvider>
    );
}
