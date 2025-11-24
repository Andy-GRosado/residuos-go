import { IReport } from "@/src/models/report.model";
import { IFromSupabase } from "@/src/models/supabase.model";
import ThemedText from "@/src/shared/components/themed-text";
import { ThemedTextBar } from "@/src/shared/components/themed-text-bar";
import ThemedView from "@/src/shared/components/themed-view";
import { ThemedViewBar } from "@/src/shared/components/themed-view-bar";
import { useAuth } from "@/src/shared/hooks/use-auth";
import { useThemeColors } from "@/src/shared/hooks/use-theme-color";
import { supabase } from "@/src/shared/utils/supabase";
import { ThemeConfigType } from "@/src/store/theme";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    Pressable
} from "react-native";
import { ReportList } from "./components/report-list";


export default function ReportHistoryContainer() {
    const { profile, getUserProfile } = useAuth();
    const [reports, setReports] = useState<(IReport & IFromSupabase)[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const themeColors = useThemeColors() as ThemeConfigType;

    // Fetch reports - memoizada para evitar recreaciones innecesarias
    const fetchUserReports = useCallback(async () => {
        if (profile == null) { return; }
        try {
            setLoading(true);
            setError(null);

            const { data, error } = await supabase
                .from("reports")
                .select("*")
                .eq("created_by", profile.id)
                .order("created_at", { ascending: false });

            if (error) throw error;

            setReports(data || []);
        } catch (err: any) {
            console.error("Error fetching reports:", err);
            setError("Error al cargar los reportes");
        } finally {
            setLoading(false);
        }
    }, [profile]);

    useEffect(() => {
        fetchUserReports();
    }, []);

    // Estados de carga y error mejorados
    if (loading) {
        return (
            <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={themeColors.tint} />
                <ThemedText style={{ marginTop: 16, color: themeColors.text[400] }}>
                    Cargando reportes...
                </ThemedText>
            </ThemedView>
        );
    }

    if (error) {
        return (
            <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name="alert-circle-outline" size={48} color={themeColors.semantic.error.default} />
                <ThemedText style={{ marginTop: 16, textAlign: 'center', color: themeColors.text[400] }}>
                    {error}
                </ThemedText>
                <Pressable
                    onPress={fetchUserReports}
                    style={{
                        marginTop: 16,
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        backgroundColor: themeColors.tint,
                        borderRadius: 8,
                    }}
                >
                    <ThemedText style={{ color: 'white' }}>Reintentar</ThemedText>
                </Pressable>
            </ThemedView>
        );
    }

    return (
        <ThemedView style={{ flex: 1 }}>
            <ThemedViewBar style={{ alignItems: "center", padding: 20, paddingTop: 60 }}>
                <ThemedTextBar type="title">Mis reportes</ThemedTextBar>
            </ThemedViewBar>


            {reports.length === 0 ? (
                <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Ionicons name="document-text-outline" size={64} color={themeColors.text[400]} />
                    <ThemedText style={{ marginTop: 16, color: themeColors.text[400] }}>
                        No hay reportes disponibles
                    </ThemedText>
                    <ThemedText type="caption" style={{ marginTop: 8, color: themeColors.text[500] }}>
                        Los reportes que crees aparecerán aquí
                    </ThemedText>
                </ThemedView>
            ) : (
                <ReportList reports={reports}></ReportList>
            )}
        </ThemedView>
    );
}