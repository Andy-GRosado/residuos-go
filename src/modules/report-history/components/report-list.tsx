import { IReport } from "@/src/models/report.model";
import { IFromSupabase } from "@/src/models/supabase.model";
import ThemedText from "@/src/shared/components/themed-text";
import { useThemeColors } from "@/src/shared/hooks/use-theme-color";
import { ThemeConfigType } from "@/src/store/theme";
import { router } from "expo-router";
import { useCallback } from "react";
import { FlatList } from "react-native";
import { ReportCard } from "./report-card";

export type ReportListProps = {
    reports: (IReport & IFromSupabase)[];
}
export function ReportList(props: ReportListProps) {
    const themeColors = useThemeColors() as ThemeConfigType;

    // Función para formatear fecha - memoizada ya que no cambia
    const formatDate = useCallback((dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    }, []);

    // Navegación memoizada
    const handleReportPress = useCallback((reportId: string) => {
        router.push(`/(app)/report/${reportId}`);
    }, [router]);

    // Render item memoizado para mejor performance de FlatList
    const renderReportItem = useCallback(({ item }: { item: IReport & IFromSupabase }) => (
        <ReportCard report={item} onPress={() => handleReportPress(item.id)}></ReportCard>
    ), [themeColors, handleReportPress, formatDate]);


    return (
        <FlatList
            data={props.reports}
            keyExtractor={(item) => item.id}
            renderItem={renderReportItem}
            contentContainerStyle={{ paddingVertical: 8 }}
            showsVerticalScrollIndicator={false}
            initialNumToRender={10}
            maxToRenderPerBatch={5}
            windowSize={5}
            removeClippedSubviews={true}
            ListHeaderComponent={
                <ThemedText
                    type="caption"
                    style={{
                        marginHorizontal: 16,
                        marginBottom: 8,
                        color: themeColors.text[500],
                        textAlign: 'center'
                    }}
                >
                    {props.reports.length} reporte{props.reports.length !== 1 ? 's' : ''} encontrado{props.reports.length !== 1 ? 's' : ''}
                </ThemedText>
            }
        />
    )
}
