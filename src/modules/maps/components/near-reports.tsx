import { IReport } from "@/src/models/report.model";
import { IFromSupabase } from "@/src/models/supabase.model";
import { ReportService } from "@/src/services/report.service";
import ThemedText from "@/src/shared/components/themed-text";
import { ThemedTextBar } from "@/src/shared/components/themed-text-bar";
import ThemedView from "@/src/shared/components/themed-view";
import { ThemedViewBar } from "@/src/shared/components/themed-view-bar";
import { useModal } from "@/src/shared/hooks/use-modal";
import { calculateDistance } from "@/src/shared/utils/utils";
import { LocationObject } from "expo-location";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleProp, ViewStyle } from "react-native";
import { ReportCard } from "./report-card";

export type NearReportsViewProps = {
    containerStyle?: StyleProp<ViewStyle>;
    location: LocationObject
}

interface ICustomReportData extends IReport, IFromSupabase {
    distance: number,
}

export function NearReportsView(props: NearReportsViewProps) {
    const [nearReports, setNearReports] = useState<ICustomReportData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { showModal } = useModal()


    const callbackFetchNearReports = useCallback(async () => {
        try {
            const data = await ReportService.getAproximatedReports(props.location.coords.latitude, props.location.coords.longitude, 0.2);
            const data_with_distance = data.map(i => {
                const distance = calculateDistance(Number(i.latitude), Number(i.longitude), props.location.coords.latitude, props.location.coords.longitude)
                return { ...i, distance: distance }
            });
            console.log(data_with_distance)
            setNearReports(data_with_distance as ICustomReportData[]);
            setLoading(false);
        } catch (error: any) {
            console.log(error)
            showModal({ title: 'Error al obtener reportes', message: 'Hubo un error al obtener los reportes', type: 'info' });
        }
    }, [])

    useEffect(() => {
        callbackFetchNearReports();
    }, [])

    return (
        <ThemedView style={[
            { maxHeight: 260, gap: 20, marginBottom: 60, borderRadius: 20 },
            props.containerStyle
        ]}>
            <ThemedViewBar style={{ paddingVertical: 12, paddingHorizontal: 24 }}>
                <ThemedTextBar type="subtitle">
                    Reportes cercanos
                </ThemedTextBar>
            </ThemedViewBar>

            <ThemedView
                style={[
                    !loading && { display: 'none' }
                ]}
            >
                <ThemedText type="bodyBold">Cargando ...</ThemedText>
            </ThemedView>
            <ScrollView
                style={[
                    { marginHorizontal: 16 },
                    loading && { display: 'none' }
                ]}
                contentContainerStyle={{ gap: 16 }}
                showsVerticalScrollIndicator={false}
                horizontal
            >
                {nearReports.map((report, index) => (
                    <ReportCard key={index} report={report} distance={report.distance} maxWidth={360}>
                    </ReportCard>
                ))}
            </ScrollView>
        </ThemedView>
    )
}


