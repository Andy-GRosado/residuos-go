import { IReport } from "@/src/models/report.model";
import { IFromSupabase } from "@/src/models/supabase.model";
import Tag, { ColorTypes } from "@/src/shared/components/tag";
import ThemedText from "@/src/shared/components/themed-text";
import ThemedView from "@/src/shared/components/themed-view";
import { ThemedViewBar } from "@/src/shared/components/themed-view-bar";
import { calculateDistance, formatUTCDateToTimePassed } from "@/src/shared/utils/utils";
import { LocationObject } from "expo-location";
import { View } from "react-native";
import { ReportCard } from "./report-card";


export type SelectedReportViewProps = {
    report: IReport & IFromSupabase
    location?: LocationObject
}

const IssueColorHashmap: Record<string, ColorTypes> = {
    'mal olor': 'orange',
    'mal aspecto': 'purple',
    'roedores': 'red',
    'mala apariencia': 'orange',
    'contaminación': 'brown',
}

export function SelectedReportView(props: SelectedReportViewProps) {

    return (
        <ThemedView>
            <ThemedViewBar style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, paddingHorizontal: 24, alignItems: 'center' }}>
                <ThemedText type="subtitle">
                    {`Reporte #${props.report?.id}`}
                </ThemedText>
                <ThemedText type="caption">
                    ({formatUTCDateToTimePassed(props.report.created_at)})
                </ThemedText>
            </ThemedViewBar>
            <View
                style={{ padding: 16, marginBottom: 20, gap: 8 }}
            >
                <View style={{ flexDirection: "row", gap: 8 }}>
                    {props.report && props.report.issues.length > 0 ? (
                        props.report.issues.map((issue, index: number) => {
                            return (
                                <Tag
                                    key={index}
                                    color={IssueColorHashmap[issue] ?? 'gray'}
                                    text={issue}
                                />
                            );
                        })
                    ) : (
                        <View></View>
                    )}
                </View>
                <ReportCard
                    report={props.report}
                    distance={props.location && calculateDistance(
                        Number(props.report.latitude),
                        Number(props.report.longitude),
                        props.location.coords.latitude,
                        props.location.coords.longitude
                    )}
                />
            </View>
        </ThemedView>
    )
}
