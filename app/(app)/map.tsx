import ThemedText from "@/components/ui/themed-text";
import ThemedView from "@/components/ui/themed-view";
import { useModal } from "@/hooks/use-modal";
import { useToast } from "@/hooks/use-toast";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    Pressable,
    StyleSheet,
    View,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";

const { width, height } = Dimensions.get("window");

// Región por defecto en caso de error (Ciudad de México)
const DEFAULT_REGION: Region = {
    latitude: 19.4326,
    longitude: -99.1332,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
};

export default function MapScreen() {
    const [region, setRegion] = useState<Region>(DEFAULT_REGION);
    const [selectedMarker, setSelectedMarker] = useState<any>(null);
    const [userLocation, setUserLocation] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [locationError, setLocationError] = useState<string | null>(null);
    const [locationPermission, setLocationPermission] =
        useState<boolean>(false);
    const [cameraPermission, setCameraPermission] = useState<boolean>(false);
    const mapRef = useRef<MapView>(null);
    const router = useRouter();
    const { showModal } = useModal();
    const { showToast } = useToast();

    // Obtener ubicación actual del dispositivo
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                let camera_permission =
                    await Location.requestForegroundPermissionsAsync();

                if (camera_permission.status != "granted") {
                    setLocationError("Permiso de ubicación denegado");
                    setLoading(false);
                    setLocationPermission(false);
                    return;
                }

                let location = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.BestForNavigation,
                    timeInterval: 1500,
                });
                let { latitude, longitude } = location.coords;
                const userRegion: Region = {
                    latitude,
                    longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                };

                setRegion(userRegion);
                setUserLocation({
                    latitude,
                    longitude,
                });
            } catch (error) {
                console.error("Error obteniendo ubicación:", error);
                setLocationError("No se pudo obtener la ubicación actual");
                showModal({
                    message: 'No se pudo obtener permisos de ubicación',
                    type: 'info',
                    confirmText: 'Volver a intentar',
                    cancelText: 'Cancelar'
                })
            } finally {
                // showModal({
                //     title: ""
                //     message: 'Ubicacion obtenida',
                //     type: "info",
                //     confirmText: "ok, gracias"
                // })
                setLoading(false);

            }
        })();
    }, []);

    // Obtener permisos de camara
    useEffect(() => {
        (async () => {
            const { status } =
                await ImagePicker.requestCameraPermissionsAsync();
            setCameraPermission(status === "granted");
        })();
    }, []);

    const handleMarkerPress = (marker: any) => {
        setSelectedMarker(marker);
        Alert.alert(marker.title, marker.description, [
            { text: "Cerrar", style: "cancel" },
            {
                text: "Ver detalles",
                onPress: () => console.log("Ver detalles:", marker.id),
            },
        ]);
    };

    const handleMapPress = () => {
        setSelectedMarker(null);
    };

    const centerMap = () => {
        if (userLocation) {
            const userRegion: Region = {
                ...userLocation,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            };
            mapRef.current?.animateToRegion(userRegion, 1000);
        } else {
            mapRef.current?.animateToRegion(DEFAULT_REGION, 1000);
        }
    };

    const zoomIn = () => {
        const newRegion: Region = {
            ...region,
            latitudeDelta: region.latitudeDelta / 2,
            longitudeDelta: region.longitudeDelta / 2,
        };
        setRegion(newRegion);
        mapRef.current?.animateToRegion(newRegion, 500);
    };

    const zoomOut = () => {
        const newRegion: Region = {
            ...region,
            latitudeDelta: region.latitudeDelta * 2,
            longitudeDelta: region.longitudeDelta * 2,
        };
        setRegion(newRegion);
        mapRef.current?.animateToRegion(newRegion, 500);
    };

    const takePhotoHere = async () => {
        try {
            // Verificar permisos de cámara
            if (!cameraPermission) {
                const { status } =
                    await ImagePicker.requestCameraPermissionsAsync();
                if (status !== "granted") {
                    showModal({
                        title: 'Permiso para uso de cámara',
                        message: 'No se puede acceder a la cámara',
                        type: 'info',
                    })
                    Alert.alert(
                        "Permiso requerido",
                        "Se necesita acceso a la cámara para tomar fotos.",
                        [{ text: "OK" }]
                    );
                    return;
                }
                setCameraPermission(true);
            }

            // Obtener ubicación actual
            let currentLocation = null;
            try {
                const location = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.Balanced,
                });
                currentLocation = {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                };
            } catch (locationError) {
                console.error(
                    "Error obteniendo ubicación para foto:",
                    locationError
                );
                // Continuar sin ubicación si hay error
            }

            // Navegar a la pantalla de cámara con la ubicación
            router.push({
                pathname: "/camera",
                params: {
                    location: currentLocation
                        ? JSON.stringify(currentLocation)
                        : null,
                },
            });
        } catch (error) {
            console.error("Error preparando cámara:", error);
            Alert.alert("Error", "No se pudo abrir la cámara", [
                { text: "OK" },
            ]);
        }
    };

    if (loading) {
        return (
            <ThemedView style={styles.container}>
                <View style={styles.header}>
                    <ThemedText type="title" style={styles.title}>
                        Mapa de residuos
                    </ThemedText>
                    <ThemedText type="default" style={styles.subtitle}>
                        Reporta acumulación de residuos cerca de tí
                    </ThemedText>
                </View>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#265373" />
                    <ThemedText type="default" style={styles.loadingText}>
                        Obteniendo tu ubicación...
                    </ThemedText>
                </View>
            </ThemedView>
        );
    }

    return (
        <ThemedView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <ThemedText type="subtitle" style={styles.title}>
                    ResiduosGo
                </ThemedText>
            </View>

            {/* Mapa */}
            <View style={styles.mapContainer}>
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={region}
                    region={region}
                    onRegionChangeComplete={setRegion}
                    onPress={handleMapPress}
                    showsUserLocation={true}
                    showsMyLocationButton={false}
                    showsCompass={true}
                    showsScale={true}
                >
                    {/* Marcadores pueden ir aquí */}
                </MapView>

                {/* Controles del mapa */}
                <View style={styles.controlsContainer}>
                    <Pressable style={styles.controlButton} onPress={centerMap}>
                        <Ionicons name="locate" size={20} color="#265373" />
                    </Pressable>

                    <View style={styles.zoomControls}>
                        <Pressable style={styles.zoomButton} onPress={zoomIn}>
                            <Ionicons name="add" size={20} color="#265373" />
                        </Pressable>
                        <Pressable style={styles.zoomButton} onPress={zoomOut}>
                            <Ionicons name="remove" size={20} color="#265373" />
                        </Pressable>
                    </View>
                </View>

                {/* Botón para tomar foto */}
                <Pressable style={styles.cameraButton} onPress={takePhotoHere}>
                    <Ionicons name="camera" size={24} color="white" />
                </Pressable>

                {/* Botón alternativo para ubicación actual */}
                {/* <Pressable style={styles.locationButton} onPress={centerMap}>
          <Ionicons name="navigate" size={20} color="white" />
        </Pressable> */}
            </View>

            {/* Información del marcador seleccionado */}
            {selectedMarker && (
                <View style={styles.markerInfo}>
                    <ThemedText type="subtitle" style={styles.markerTitle}>
                        {selectedMarker.title}
                    </ThemedText>
                    <ThemedText type="default" style={styles.markerDescription}>
                        {selectedMarker.description}
                    </ThemedText>
                </View>
            )}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 20,
        paddingTop: 60,
        backgroundColor: "#265373",
    },
    title: {
        color: "white",
        textAlign: "center",
        marginBottom: 5,
    },
    subtitle: {
        color: "rgba(255, 255, 255, 0.8)",
        textAlign: "center",
    },
    errorText: {
        color: "#ff6b6b",
        textAlign: "center",
        marginTop: 10,
        fontSize: 12,
    },
    mapContainer: {
        flex: 1,
        position: "relative",
    },
    map: {
        width: "100%",
        height: "100%",
    },
    controlsContainer: {
        position: "absolute",
        top: 20,
        right: 20,
        gap: 10,
    },
    controlButton: {
        backgroundColor: "white",
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    zoomControls: {
        backgroundColor: "white",
        borderRadius: 22,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    zoomButton: {
        width: 44,
        height: 44,
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    cameraButton: {
        position: "absolute",
        bottom: 40,
        right: 20,
        backgroundColor: "#265373",
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    locationButton: {
        position: "absolute",
        bottom: 30,
        right: 20,
        backgroundColor: "#265373",
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    markerInfo: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "white",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    markerTitle: {
        color: "#265373",
        marginBottom: 5,
    },
    markerDescription: {
        color: "#666",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
    },
    loadingText: {
        marginTop: 16,
        color: "#265373",
        textAlign: "center",
    },
});
