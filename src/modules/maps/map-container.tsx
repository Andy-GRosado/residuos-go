import { IReport } from "@/src/models/report.model";
import { IFromSupabase } from "@/src/models/supabase.model";
import { ThemedTextBar } from "@/src/shared/components/themed-text-bar";
import ThemedView from "@/src/shared/components/themed-view";
import { ThemedViewBar } from "@/src/shared/components/themed-view-bar";
import { useThemeColors } from "@/src/shared/hooks/use-theme-color";
import { ThemeConfigType } from "@/src/store/theme";
import { Ionicons } from "@expo/vector-icons";
import { LocationObject } from "expo-location";
import React, { useState } from "react";
import { ActivityIndicator, View } from "react-native";

import { ReportsMapView } from "./components/map-view";
import { NearReportsView } from "./components/near-reports";
import { SelectedReportView } from "./components/selected-report";
import { useLocation } from "./hooks/use-location";

export function MapContainer() {
    const themeColors = useThemeColors() as ThemeConfigType;
    const [selectedReport, setSelectedMarker] = useState<(IReport & IFromSupabase) | null>(null);
    const [isLoadingMarkers, setIsLoadingMarkers] = useState(false);

    const {
        location,
        isWatching, // Nuevo estado del watching
    } = useLocation();

    const handleSelectReport = async (report: (IReport & IFromSupabase)) => {
        setSelectedMarker(report);
    };

    const handleUnselectReport = async () => {
        setSelectedMarker(null);
    };


    return (
        <ThemedView style={{flex: 1}}>
            {/* Header */}
            <ThemedViewBar style={{ alignItems: "center", padding: 20, paddingTop: 60 }}>
                <ThemedTextBar type="title">ResiduosGo</ThemedTextBar>
                {/* Indicador de estado del location */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <Ionicons
                        name={isWatching ? "location" : "location-outline"}
                        size={16}
                        color={themeColors.bar.text.default}
                    />
                    <ThemedTextBar type="caption" style={{ marginLeft: 5 }}>
                        {isWatching ? "Monitoreando ubicación" : "Ubicación no disponible"}
                    </ThemedTextBar>
                    {isLoadingMarkers && (
                        <ActivityIndicator size="small" color={themeColors.tint} style={{ marginLeft: 10 }} />
                    )}
                </View>
            </ThemedViewBar>

            {/* Mapa */}
            <ReportsMapView handleSelectReport={handleSelectReport} handleMapPress={handleUnselectReport}></ReportsMapView>


            {/* Near reports */}
            {(location) && (
                <NearReportsView containerStyle={{ display: selectedReport ? 'none' : 'flex' }} location={location as LocationObject}></NearReportsView>
            )}

            {/* Selected report of the map */}
            {
                (selectedReport != null) && (
                    // Selected report
                    <SelectedReportView report={selectedReport} location={location} />
                )
            }
        </ThemedView >
    );
}