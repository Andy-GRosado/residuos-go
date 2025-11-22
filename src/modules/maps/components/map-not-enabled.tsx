import ThemedText from "@/src/shared/components/themed-text";
import ThemedView from "@/src/shared/components/themed-view";


export function MapNotEnabled() {
    return (
        <ThemedView>
            <ThemedText>El mapa de reportes no fue cargado correctamente</ThemedText>
            <ThemedText style={{color: 'red'}}>Verifica que el permiso para acceder a la ubicacion esté habilitado</ThemedText>
        </ThemedView>
    )
}
