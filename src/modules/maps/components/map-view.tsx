import { IReport } from "@/src/models/report.model";
import { IFromSupabase } from "@/src/models/supabase.model";
import { ReportService } from "@/src/services/report.service";
import { useModal } from "@/src/shared/hooks/use-modal";
import { useThemeColors } from "@/src/shared/hooks/use-theme-color";
import { ThemeConfigType } from "@/src/store/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, View, ViewProps } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { useLocation } from "../hooks/use-location";

export type ReportsMapViewProps = {
    containerStyle?: ViewProps;
    handleMapPress?: () => Promise<any>;
    handleSelectReport: (report: (IReport & IFromSupabase)) => Promise<any>;
}

const DEFAULT_REGION: Region = {
    latitude: -12.213625,
    longitude: -76.93974,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
};

export function ReportsMapView(props: ReportsMapViewProps) {
    const themeColors = useThemeColors() as ThemeConfigType;
    const { location } = useLocation();
    const { showModal } = useModal();

    // Component states
    const [region, setRegion] = useState<Region>(DEFAULT_REGION);
    const [reports, setReports] = useState<(IReport & IFromSupabase)[]>([]);
    const [loadedReports, setLoadedReports] = useState<boolean>(false);
    const mapRef = useRef<MapView>(null);

    const callbackFetchReports = useCallback(async () => {
        setLoadedReports(true);
        try {
            const data = await ReportService.getReportsInArea();
            setReports(data);
        } catch (error: any) {
            showModal({ title: 'Error al obtener reportes', message: 'Hubo un error al obtener los reportes', type: 'info' });
        } finally {
            setLoadedReports(false);
        }
    }, [])

    useEffect(() => {
        callbackFetchReports();
    }, [])

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
        mapRef.current?.animateToRegion(newRegion, 500);
        setRegion(newRegion);
    };

    const zoomOut = () => {
        const newRegion: Region = {
            ...region,
            latitudeDelta: region.latitudeDelta * 2,
            longitudeDelta: region.longitudeDelta * 2,
        };
        mapRef.current?.animateToRegion(newRegion, 500);
        setRegion(newRegion);
    };

    return (
        < View
            style={[
                { flex: 1, position: "relative" },
                props.containerStyle
            ]}
        >
            <MapView
                ref={mapRef}
                style={{ width: "100%", height: "100%" }}
                provider={PROVIDER_GOOGLE}
                initialRegion={region}
                region={region}
                onRegionChangeComplete={setRegion}
                onPress={props.handleMapPress}
                showsUserLocation={true}
                showsMyLocationButton={false}
                showsCompass={true}
                showsScale={true}
                loadingEnabled={true}
                loadingBackgroundColor={themeColors.background.default}
                loadingIndicatorColor={themeColors.tint}
                
            >
                {/* Tus marcadores */}
                {reports.map((marker, index) => (
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
                ))}
            </MapView>



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
                    style={[
                        {
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
                        {

                            backgroundColor: themeColors.bar.background[200],
                        }
                    ]}
                    onPress={centerMap}
                >
                    <Ionicons
                        name="locate"
                        size={20}
                        color={themeColors.bar.text[100]}
                    />
                </Pressable>

                <View
                    style={[
                        {
                            backgroundColor: "white",
                            borderRadius: 22,
                            overflow: "hidden",
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                        },
                        { backgroundColor: themeColors.bar.background[200], }
                    ]}
                >
                    <Pressable
                        style={[
                            {
                                width: 44, height: 44,
                                justifyContent: "center",
                                alignItems: "center",
                                borderBottomWidth: 1,
                            },
                            {

                                borderBottomWidth: 1,
                                borderColor: themeColors.text[400],
                            }
                        ]}
                        onPress={zoomIn}
                    >
                        <Ionicons
                            name="add"
                            size={20}
                            color={themeColors.bar.text[100]}
                        />
                    </Pressable>
                    <Pressable
                        style={[
                            {
                                width: 44, height: 44,
                                justifyContent: "center",
                                alignItems: "center",
                                borderBottomWidth: 1,
                            },
                            {
                                borderBottomWidth: 0,
                            }
                        ]}
                        onPress={zoomOut}
                    >
                        <Ionicons
                            name="remove"
                            size={20}
                            color={themeColors.bar.text[100]}
                        />
                    </Pressable>
                </View>

                <Pressable
                    style={[
                        {
                            width: 44,
                            height: 44,
                            borderRadius: 22,
                            justifyContent: "center",
                            alignItems: "center",
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                        },
                        { backgroundColor: themeColors.bar.background[200] }
                    ]}
                    onPress={callbackFetchReports}
                    disabled={loadedReports}
                >
                    <Ionicons
                        name="refresh"
                        size={20}
                        color={loadedReports ? themeColors.text[400] : themeColors.bar.text[100]}
                    />
                </Pressable>
            </View>

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
