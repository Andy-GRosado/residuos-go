import { IReport } from "@/src/models/report.model";
import { IFromSupabase } from "@/src/models/supabase.model";
import { ReportService } from "@/src/services/report.service";
import ThemedText from "@/src/shared/components/themed-text";
import ThemedView from "@/src/shared/components/themed-view";
import { useModal } from "@/src/shared/hooks/use-modal";
import { useThemeColors } from "@/src/shared/hooks/use-theme-color";
import { ThemeConfigType } from "@/src/store/theme";
import { Ionicons } from "@expo/vector-icons";
import * as Location from 'expo-location';
import { GoogleMaps, useLocationPermissions } from 'expo-maps';
import { GoogleMapsColorScheme } from "expo-maps/build/google/GoogleMaps.types";
import { router } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, View, ViewProps } from "react-native";
import { Region } from "react-native-maps";
import { MapNotEnabled } from "./map-not-enabled";

export type ReportsMapViewProps = {
    containerStyle?: ViewProps;
    handleMapPress?: () => Promise<any>;
    // handleSelectReport: (report: (IReport & IFromSupabase)) => Promise<any>;
}

const DEFAULT_REGION: Region = {
    latitude: -12.213625,
    longitude: -76.93974,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
};

export function ExpoReportMapsView(props: ReportsMapViewProps) {
    const { showModal } = useModal();
    const themeColors = useThemeColors() as ThemeConfigType;
    const [status, requestPermission] = useLocationPermissions();

    const [reports, setReports] = useState<(IReport & IFromSupabase)[]>([]);
    const [userLocation, setUserLocation] = useState<Region>(DEFAULT_REGION);
    const mapRef = useRef<GoogleMaps.MapView>(null);

    const handleFetchReports = useCallback(async () => {
        try {
            const data = await ReportService.getReportsInArea();
            setReports(data);
        } catch (error: any) {
            showModal({ title: 'Error al obtener reportes', message: 'Hubo un error al obtener los reportes', type: 'info' });
        } finally {
            
        }
    }, [setReports])

    const handleUpdateUserLocation = useCallback(async () => {
        const currentUserLocation = await Location.getCurrentPositionAsync();
        setUserLocation({
            latitude: currentUserLocation.coords.latitude,
            longitude: currentUserLocation.coords.longitude,
            latitudeDelta: DEFAULT_REGION.latitudeDelta,
            longitudeDelta: DEFAULT_REGION.latitudeDelta,
        })
    }, [setUserLocation])

    useEffect(() => {
        handleUpdateUserLocation();
        handleFetchReports();
    }, [])

    if (status == null) {
        return (
            <ThemedView>
                <ThemedText>Solicitando permisos de ubicacion ...</ThemedText>
            </ThemedView>
        )
    }

    if (!status.granted) {
        return (
            <MapNotEnabled />
        )
    }

    return (
        < View
            style={[
                { flex: 1, position: "relative" },
                props.containerStyle
            ]}
        >
            <GoogleMaps.View
                ref={mapRef}
                style={{ width: "100%", height: "100%" }}
                // provider={PROVIDER_GOOGLE}
                cameraPosition={{
                    coordinates: {
                        latitude: DEFAULT_REGION.latitude,
                        longitude: DEFAULT_REGION.longitude,
                    },
                    zoom: 1,
                }}
                uiSettings={{
                    compassEnabled: true,
                    myLocationButtonEnabled: true,
                    zoomControlsEnabled: true,
                    scaleBarEnabled: true,
                    zoomGesturesEnabled: true,
                    scrollGesturesEnabled: true,
                }}
                colorScheme={GoogleMapsColorScheme.FOLLOW_SYSTEM}

                // userLocation={{ 
                //     coordinates: { 
                //         latitude: userLocation.latitude, 
                //         longitude: userLocation.longitude 
                //     }, 
                //     followUserLocation: true 
                // }}
                
                properties={{
                    isMyLocationEnabled: true
                }}

            >
                {/* Tus marcadores */}
                {/* {reports.map((marker, index) => (
                    <Marker
                        key={marker.id}
                        coordinate={{
                            latitude: Number(marker.latitude),
                            longitude: Number(marker.longitude),
                        }}
                        title={`${marker.title.slice(0, 20)}${marker.title.length > 20 ? "..." : ""}`}
                        description={`${marker.description.slice(0, 20)}${marker.description.length > 20 ? "..." : ''}`}
                        icon={require('@/src/shared/assets/icons/bag_red.png')}
                        onPress={() => { props.handleSelectReport(marker) }}
                    >
                    </Marker>
                ))} */}
            </GoogleMaps.View>



            {/* Boton de historial */}
            <Pressable
                style={[
                    {
                        position: "absolute",
                        bottom: 120, right: 20,
                        width: 64, height: 64,
                        borderRadius: 64,
                        justifyContent: "center",
                        alignItems: "center",
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                    },
                    {
                        top: 20,
                        left: 20,
                        backgroundColor: themeColors.bar.background[200],
                    }
                ]}
                onPress={() => { router.push("/(app)/report-history") }}
            >
                <Ionicons
                    name="document"
                    size={24}
                    color={themeColors.bar.text[100]}
                />
            </Pressable>

            {/* Botón para tomar foto */}
            {
                <Pressable
                    style={[
                        {
                            position: "absolute",
                            bottom: 72, right: 20,
                            width: 64, height: 64,
                            borderRadius: 64,
                            justifyContent: "center",
                            alignItems: "center",
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                        },
                        { backgroundColor: themeColors.bar.background[200], }
                    ]}
                    onPress={() => { router.push("/(app)/camera") }}
                >
                    <Ionicons name="camera" size={24} color={themeColors.bar.text[100]} />
                </Pressable>
            }
        </View >
    )

}
