import { IReport } from "@/src/models/report.model";
import { IFromSupabase } from "@/src/models/supabase.model";
import PrimaryButton from "@/src/shared/components/primary-button";
import Tag, { ColorTypes } from "@/src/shared/components/tag";
import ThemedText from "@/src/shared/components/themed-text";
import { useAuth } from "@/src/shared/hooks/use-auth";
import { useModal } from "@/src/shared/hooks/use-modal";
import { useThemeColors } from "@/src/shared/hooks/use-theme-color";
import { supabase } from "@/src/shared/utils/supabase";
import { ThemeConfigType } from "@/src/store/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { View } from "react-native-reanimated/lib/typescript/Animated";

const IssueColorHashmap: Record<string, ColorTypes> = {
    'mal olor': 'orange',
    'mal aspecto': 'purple',
    'roedores': 'red',
    'mala apariencia': 'blue',
    'contaminación': 'brown',
}

type ReportData = {
    report: IReport & IFromSupabase;
    participationCount: number;
    ownParticipation: boolean;
};

export type ReportDetailProps = {
    reportId: string;
}

export function ReportDetail(props: ReportDetailProps) {
    const { profile } = useAuth();
    const { showModal } = useModal();
    const themeColors = useThemeColors() as ThemeConfigType;
    const [imageLoading, setImageLoading] = useState(false);
    const [reportData, setReportData] = useState<ReportData | null>(null);
    const [isChangingState, setIsChangingState] = useState<boolean>(false);
    const ReportStates: Record<string, { name: string, color: string, icon: string }> = {
        pending: {
            name: "Pendiente",
            icon: "hourglass",
            color: themeColors.semantic.warning.default
        },
        resolved: {
            name: "Pendiente",
            icon: "checkmark-done",
            color: themeColors.semantic.success.default
        }
    }

    const fetchAllData = useCallback(async (id: string, userId: string) => {
        try {
            const [report, participation_counts, own_participation] = await Promise.all([
                supabase
                    .from("reports")
                    .select(`
                            *,
                            author:profiles!reports_created_by_fkey(username, photo_url)
                        `)
                    .eq("id", id)
                    .single(),
                supabase
                    .from("report-participation")
                    .select('*', { count: 'exact' })
                    .eq("report_id", id),
                supabase
                    .from("report-participation")
                    .select('*')
                    .eq("report_id", id)
                    .eq("created_by", userId)
                    .maybeSingle()
            ]);

            if (report.error) { throw report.error; };
            if (participation_counts.error) { throw participation_counts.error; };
            if (own_participation.error) { throw own_participation.error; };

            const response: ReportData = {
                report: report.data,
                participationCount: participation_counts.data.length,
                ownParticipation: own_participation.data ? true : false,
            }
            return response;
        } catch (error: any) {
            throw error;
        }
    }, [])

    // Add participation of user
    const addReportParticipation = useCallback(async () => {
        if (!profile) {
            showModal({
                title: 'Acción requerida',
                message: 'Debes iniciar sesión para interactuar con reportes',
                type: 'info'
            });
            return;
        }

        if (!reportData || reportData.ownParticipation == true) {
            return;
        }

        try {
            const { data: existent_participation, error: error_existent_participation } = await supabase
                .from("report-participation")
                .select('*')
                .eq('created_by', profile.id)
                .eq('report_id', props.reportId)
                .single();

            if (existent_participation) {
                return
            }

            const { data, error } = await supabase
                .from("report-participation")
                .insert({
                    created_by: profile.id,
                    report_id: props.reportId,
                })
                .select()
                .single();

            if (error) throw error;

            // Optimistically update the UI
            setReportData(prev => {
                if (!prev) return null;

                return {
                    ...prev,
                    ownParticipation: true,
                    participationCount: prev.participationCount + 1
                };
            });

        } catch (error: any) {
            showModal({
                title: 'Error',
                message: 'No se pudo actualizar el estado del reporte',
                type: 'info'
            });
        }
    }, [profile, showModal]);


    const updateStatus = useCallback(async () => {
        if (!reportData) {
            return;
        }

        setIsChangingState(true);
        try {
            if (reportData.report.state == 'resolved') {
                throw new Error('El reporte ya ha sido atendido')
            }

            const { error } = await supabase
                .from('reports')
                .update({ state: 'resolved' })
                .eq('id', props.reportId)

            if (error) {
                throw error;
            }

            setReportData(prev => {
                if (!prev) return null;

                return {
                    ...prev,
                    report: {
                        ...prev.report,
                        state: (prev.report.state == 'pending') ? 'resolved' : 'pending'
                    }
                };
            });

        } catch (error: any) {
            showModal({ title: 'Error al actualizar estado', message: error.message, type: 'info' });
        } finally {
            setIsChangingState(false);
        }
    }, [reportData, setReportData]);

    useEffect(() => {
        if (profile) {
            (async () => {
                const report_information = await fetchAllData(props.reportId, profile.id);
                setReportData(report_information);
            })()
        }
    }, []);

    return (
        <>
            <View
                style={{
                    position: "relative",
                    borderRadius: 20,
                    borderWidth: 2,
                    borderColor: themeColors.background[200],
                    overflow: "hidden",
                }}
            >
                <View style={{ width: "100%", height: 700 }}>
                    {imageLoading && (
                        <View
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: themeColors.background[100],
                                zIndex: 1
                            }}
                        >
                            <ActivityIndicator size="large" color={themeColors.tint} />
                            <ThemedText style={{ marginTop: 8 }}>Cargando imagen...</ThemedText>
                        </View>
                    )}



                    <Image
                        source={{ uri: reportData ? reportData.report.image_url : require("@/src/shared/assets/images/image-broken.png") }}
                        style={{
                            width: "100%",
                            height: 700,
                            opacity: imageLoading ? 0 : 1
                        }}
                        onLoadStart={() => setImageLoading(true)}
                        onLoad={() => setImageLoading(false)}
                        onError={() => setImageLoading(false)}
                    />

                    {/* Header Gradient */}
                    <View
                        // colors={["rgba(20, 20, 20, 1)", "rgba(0, 0, 0, 0.7)", "transparent"]}
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: 120,
                            padding: 16,
                            paddingBlock: 12,
                        }}
                    >
                        <ThemedText type="subtitle">{reportData ? reportData.report.title : ''}</ThemedText>
                    </View>

                    {/* Footer Gradient */}
                    <View
                        // colors={["transparent", "rgba(0, 0, 0, 0.7)", "rgba(20, 20, 20, 1)"]}
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            width: "100%",
                            height: 160,
                            padding: 16,
                            paddingBlock: 16,
                            justifyContent: "flex-end",
                        }}
                    >
                        <ThemedText style={{ marginBottom: 8 }} numberOfLines={3}>
                            {reportData ? reportData.report.description : "Sin descripción"}
                        </ThemedText>
                        <View style={{ flexDirection: "row", gap: 8, flexWrap: 'wrap' }}>
                            {(reportData ? reportData.report.issues : []).map((item: string, index) => (
                                <Tag
                                    key={index}
                                    color={IssueColorHashmap[item] ?? 'gray'}
                                    text={item}
                                />
                            ))}
                        </View>
                    </View>


                    {/* Participation icon button */}
                    {
                        reportData && (
                            <View
                                style={{
                                    position: 'absolute',
                                    flexDirection: 'row',
                                    gap: 16,
                                    bottom: 140,
                                    right: 20,
                                    backgroundColor: 'rgba(0,0,0,0.7)',
                                    padding: 12,
                                    borderRadius: 20
                                }}
                            >
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    style={{ alignItems: 'center' }}
                                    onPress={() => addReportParticipation()}
                                >
                                    <ThemedText type="caption" style={{ color: 'white', marginBottom: 4 }}>
                                        {reportData.participationCount}
                                    </ThemedText>
                                    <Ionicons
                                        name="megaphone"
                                        color={
                                            reportData.ownParticipation
                                                ? themeColors.semantic.warning.default
                                                : 'white'
                                        }
                                        size={32}
                                    />
                                </TouchableOpacity>
                            </View>
                        )
                    }
                </View>
            </View>

            {/* Status change button */}
            {
                reportData && (
                    <View style={{ position: 'relative' }}>
                        <View style={[
                            {
                                position: 'absolute',
                                bottom: 0,
                                paddingTop: 120,
                                flexDirection: 'row',
                                gap: 6,
                                justifyContent: 'center',
                                maxWidth: 160,
                                width: '100%',
                                paddingVertical: 4,
                                borderRadius: 16,
                                alignItems: 'center',
                                zIndex: -100,
                                backgroundColor: (reportData.report.state == 'resolved' && themeColors.semantic.success.default) || (reportData.report.state == 'pending' && themeColors.semantic.warning.default) || 'gray'
                            },
                        ]}>
                            {
                                (isChangingState) ? (
                                    <ActivityIndicator
                                        size="small"
                                        color="white"
                                    />
                                ) : (
                                    <Ionicons name={ReportStates[reportData.report.state].icon as any} color={themeColors.text.default} size={20}></Ionicons>
                                )
                            }
                            <ThemedText type='subtitle' style={{ paddingVertical: 12, fontSize: 16 }}>
                                {(reportData.report.state == 'resolved' && 'Atendido') || (reportData.report.state == 'pending' && 'Pendiente') || 'Sin estado'}
                            </ThemedText>
                        </View>
                        {
                            <View style={{ height: 50 }}>
                                <PrimaryButton style={{ marginLeft: 168, marginTop: -8, display: (reportData.report.state == 'resolved') ? "contents" : undefined }} onPress={updateStatus}>
                                    <ThemedText type="bodyBold" style={{ display: (reportData.report.state == 'resolved') ? "contents" : undefined }}>Marcar como atendido</ThemedText>
                                </PrimaryButton>
                            </View>

                        }
                    </View>
                )
            }
        </>
    )
}
