import ThemedLogoHeaderBar from "@/src/shared/components/themed-logo-header-bar";
import ThemedText from "@/src/shared/components/themed-text";
import { ThemedTextBar } from "@/src/shared/components/themed-text-bar";
import ThemedView from "@/src/shared/components/themed-view";
import { ThemedViewBar } from "@/src/shared/components/themed-view-bar";
import { useAuth } from "@/src/shared/hooks/use-auth";
import { useThemeColors } from "@/src/shared/hooks/use-theme-color";
import { ThemeConfigType } from "@/src/store/theme";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { NewProfileForm } from "./components/new-profile-form";

export function NewProfileContainer() {
    const themeColors = useThemeColors() as ThemeConfigType;
    const { getProfile } = useAuth();

    const [isCheckingProfile, setIsCheckingProfile] = useState(true);

    useEffect(() => {
        const checkProfile = async () => {
            try {
                const profile = await getProfile();
                console.log('Profile in container:', profile);
                
                // Si ya tiene perfil, redirigir al mapa
                if (profile) {
                    router.replace('/(app)/map');
                }
            } catch (error) {
                console.error('Error checking profile:', error);
            } finally {
                setIsCheckingProfile(false);
            }
        };
        
        checkProfile();
    }, []);

    // Estado de carga
    if (isCheckingProfile) {
        return (
            <ThemedViewBar
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: themeColors.bar.background.default,
                }}
            >
                <ThemedTextBar type="title">
                    ResiduosGo
                </ThemedTextBar>
                <ThemedText
                    style={{
                        paddingTop: 24,
                        color: 'white',
                        textAlign: 'center'
                    }}>
                    Verificando perfil...
                </ThemedText>
                <ActivityIndicator
                    size="large"
                    color="white"
                    style={{ marginTop: 30 }}
                />
            </ThemedViewBar>
        );
    }

    // Mostrar formulario para crear perfil
    return (
        <ThemedView style={{ flex: 1 }}>
            <ThemedLogoHeaderBar title="Vamos a crear un perfil!" />
            <NewProfileForm 
                handleAfterCreateProfile={() => { 
                    router.replace("/(app)/map");
                }} 
            />
        </ThemedView>
    );
}