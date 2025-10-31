import { ThemedTextBar } from "@/components/ui/bar/themed-text-bar";
import { ThemedViewBar } from "@/components/ui/bar/themed-view-bar";
import ThemedText from "@/components/ui/themed-text";
import ThemedView from "@/components/ui/themed-view";
import { ThemeConfigType } from "@/constants/theme";
import { useLocation } from "@/hooks/use-location";
import { useModal } from "@/hooks/use-modal";
import { useThemeColors } from "@/hooks/use-theme-color";
import { supabase } from "@/utils/supabase";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";

const DEFAULT_MARKERS = [
    {
        id: 1,
        latitude: -12.202423,
        longitude: -76.93974,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        title: "Basura reportada",
        description: "Acumulación de residuos plásticos",
    },

    {
        id: 2,
        latitude: -12.201423,
        longitude: -76.93974,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        title: "Basura reportada",
        description: "Acumulación de residuos papel",
    },
];

const DEFAULT_REGION: Region = {
    latitude: -12.213625,
    longitude: -76.93974,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
};

export default function MapScreen() {
    const themeColors = useThemeColors() as ThemeConfigType;
    const [region, setRegion] = useState<Region>(DEFAULT_REGION);
    const [markers, setMarkers] = useState<any[]>([]);
    const [selectedMarker, setSelectedMarker] = useState<any>([]);
    const {
        locationPermission,
        location,
        askLocationPermission,
        updateLocation,
    } = useLocation();

    const mapRef = useRef<MapView>(null);
    const router = useRouter();
    const { showModal } = useModal();

    useEffect(() => {
        const fetch_markers = async () => {
            try {
                const { data, error: supabaseError } = await supabase
                    .from("reports")
                    .select("*");

                if (supabaseError) {
                    setMarkers([]);
                    throw supabaseError;
                }

                setMarkers(data || []);
            } catch (err) {
                console.error("Error:", err);
                setMarkers([]);
            } finally {
                // Nada
            }
        };

        fetch_markers();
    }, []);

    const handleMarkerPress = (marker: any) => {
        setSelectedMarker(marker);
    };

    const handleMapPress = () => {
        setSelectedMarker(null);
    };

    const centerMap = () => {
        if (location != undefined) {
            const userRegion: Region = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
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
            // Navegar a la pantalla de cámara con la ubicación
            router.push({
                pathname: "/camera",
            });
        } catch (error) {
            console.error("Error preparando cámara:", error);
            Alert.alert("Error", "No se pudo abrir la cámara", [
                { text: "OK" },
            ]);
        }
    };

    return (
        <ThemedView style={{ flex: 1 }}>
            {/* Header */}
            <ThemedViewBar
                style={{ alignItems: "center", padding: 20, paddingTop: 60 }}
            >
                <ThemedTextBar type="subtitle">ResiduosGo</ThemedTextBar>
            </ThemedViewBar>

            {/* Mapa */}
            <View style={{ flex: 1, position: "relative" }}>
                <MapView
                    ref={mapRef}
                    style={{ width: "100%", height: "100%" }}
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
                    {markers.map((marker) => (
                        <Marker
                            key={marker.id}
                            coordinate={{
                                latitude: marker.latitude,
                                longitude: marker.longitude,
                            }}
                            title={marker.title}
                            description={marker.description}
                            onPress={() => {
                                handleMarkerPress(marker);
                            }}
                            pinColor={themeColors.semantic.error[100]}
                        ></Marker>
                    ))}
                </MapView>

                {/* Boton de historial */}
                <Pressable
                    style={{
                        ...styles.cameraButton,
                        top: 20,
                        left: 20,
                        backgroundColor: themeColors.bar.background[200],
                    }}
                    onPress={() => { router.push("/(app)/history") }}
                >
                    <Ionicons
                        name="document"
                        size={24}
                        color={themeColors.bar.text[100]}
                    />
                </Pressable>

                {/* Controles del mapa */}
                <View
                    style={{
                        position: "absolute",
                        top: 20,
                        right: 20,
                        gap: 10,
                    }}
                >
                    <Pressable
                        style={{
                            ...styles.centerControl,
                            backgroundColor: themeColors.bar.background[200],
                        }}
                        onPress={centerMap}
                    >
                        <Ionicons
                            name="locate"
                            size={20}
                            color={themeColors.bar.text[100]}
                        />
                    </Pressable>

                    <View
                        style={{
                            ...styles.zoomControls,
                            backgroundColor: themeColors.bar.background[200],
                        }}
                    >
                        <Pressable
                            style={{
                                ...styles.zoomButton,
                                borderBottomWidth: 1,
                                borderColor: themeColors.text[400],
                            }}
                            onPress={zoomIn}
                        >
                            <Ionicons
                                name="add"
                                size={20}
                                color={themeColors.bar.text[100]}
                            />
                        </Pressable>
                        <Pressable
                            style={{
                                ...styles.zoomButton,
                                borderBottomWidth: 0,
                            }}
                            onPress={zoomOut}
                        >
                            <Ionicons
                                name="remove"
                                size={20}
                                color={themeColors.bar.text[100]}
                            />
                        </Pressable>
                    </View>
                </View>

                {/* Botón para tomar foto */}
                {location === undefined ? (
                    <Pressable
                        style={{
                            ...styles.cameraButton,
                            backgroundColor: themeColors.background[200],
                        }}
                        onPress={() => {
                            if (
                                locationPermission &&
                                locationPermission.status == "granted"
                            ) {
                                updateLocation();
                            } else {
                                askLocationPermission();
                            }
                        }}
                    >
                        <Ionicons name="lock-closed" size={24} color="white" />
                    </Pressable>
                ) : (
                    <Pressable
                        style={{
                            ...styles.cameraButton,
                            backgroundColor: themeColors.bar.background[200],
                        }}
                        onPress={takePhotoHere}
                    >
                        <Ionicons name="camera" size={24} color={themeColors.bar.text[100]} />
                    </Pressable>
                )}
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
    centerControl: {
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
    },
    cameraButton: {
        position: "absolute",
        bottom: 120,
        right: 20,
        width: 64,
        height: 64,
        borderRadius: 64,
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
});
