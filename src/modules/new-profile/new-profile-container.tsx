import ThemedLogoHeaderBar from "@/src/shared/components/themed-logo-header-bar";
import ThemedView from "@/src/shared/components/themed-view";
import { router } from "expo-router";
import { NewProfileForm } from "./components/new-profile-form";

export function NewProfileContainer() {

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