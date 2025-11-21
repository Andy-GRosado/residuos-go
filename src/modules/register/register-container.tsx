import ThemedLogoHeaderBar from "@/src/shared/components/themed-logo-header-bar";
import ThemedText from "@/src/shared/components/themed-text";
import ThemedView from "@/src/shared/components/themed-view";
import { useThemeColors } from "@/src/shared/hooks/use-theme-color";
import { ThemeConfigType } from "@/src/store/theme";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, View } from "react-native";
import RegisterForm from "./components/register-form";



export default function RegisterContainer() {
    const themeColors = useThemeColors() as ThemeConfigType;
    const router = useRouter();

    return (
        <ThemedView style={{ flex: 1 }}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
                showsVerticalScrollIndicator={false}
            >
                <ThemedLogoHeaderBar title={"Registrate"} />
                <ThemedView style={{ flex: 1, padding: 20, gap: 24 }}>
                    {/* Header */}
                    <View style={{  }}>
                        <ThemedText type="subtitle" style={{ fontWeight: "bold" }}>
                            Hola 😃!
                        </ThemedText>
                        <ThemedText style={{ color: themeColors.text[500] }}>
                            Crea una nueva cuenta para continuar
                        </ThemedText>
                    </View>

                    {/* Formulario - MUCHO MÁS SIMPLE */}
                    <RegisterForm handleAfterRegister={() => { router.back(); }}></RegisterForm>


                    {/* Link a Login */}
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 5,
                    }}>
                        <ThemedText style={{ color: "#666" }}>
                            ¿Ya tienes una cuenta?
                        </ThemedText>
                        <Pressable onPress={() => router.back()}>
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