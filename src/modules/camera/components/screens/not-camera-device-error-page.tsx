import ThemedText from "@/src/shared/components/themed-text";
import ThemedView from "@/src/shared/components/themed-view";

export function NotCameraDeviceErrorPage() {
    return (
        <ThemedView style={{ height: 60 }}>
            <ThemedText>No se encontró la camara del dispositivo</ThemedText>
        </ThemedView>
    )
}
