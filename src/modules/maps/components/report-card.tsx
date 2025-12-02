import { IReport } from "@/src/models/report.model";
import { IFromSupabase } from "@/src/models/supabase.model";
import ThemedText from "@/src/shared/components/themed-text";
import { useThemeColors } from "@/src/shared/hooks/use-theme-color";
import { ThemeConfigType } from "@/src/store/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";



export type ReportCardProps = {
    report: (IReport & IFromSupabase),
    distance?: number
    maxWidth?: 240 | 360 | '100%'
}
export function ReportCard(props: ReportCardProps) {
    const themeColors = useThemeColors() as ThemeConfigType;
    const ReportStates: Record<string, { name: string, color: string, icon: string }> = {
        pending: {
            name: "Pendiente",
            icon: "hourglass",
            color: themeColors.semantic.warning.default
        },
        resolved: {
            name: "Atendido",
            icon: "checkmark-done",
            color: themeColors.semantic.success.default
        }
    }

    return (
        <TouchableOpacity
            style={[
                {
                    flexDirection: 'row',
                    padding: 12,
                    borderRadius: 12,
                    borderWidth: 1,
                    shadowOffset: { width: 0, height: 2, },
                    shadowOpacity: 0.1,
                    shadowRadius: 3.84,
                    elevation: 5,
                    backgroundColor: themeColors.background[400],
                    borderColor: themeColors.text[500],
                    minHeight: 180,
                    maxHeight: 190,
                    maxWidth: props.maxWidth
                }
            ]}
            activeOpacity={0.7}
            onPress={() => { router.push(`/(app)/report/${props.report.id}`) }}
        >
            {/* Contenido de texto a la izquierda */}
            <View style={{ width: 'auto', marginRight: 12, justifyContent: 'space-between', gap: 8, display: 'flex', flexShrink: 1 }} >
                <View style={{ gap: 4 }}>
                    <ThemedText type="bodyBold" numberOfLines={1} style={{ borderBottomWidth: 1, borderBottomColor: themeColors.text[500] }}>
                        {props.report.title}
                    </ThemedText>
                    <ThemedText numberOfLines={2}>
                        {props.report.description}
                    </ThemedText>
                </View>

                {props.distance && (
                    <ThemedText type="caption" style={{ color: themeColors.text[500] }}>
                        A {Number(props.distance).toFixed(2)} metros de distancia
                    </ThemedText>
                )}
            </View>

            {/* Imagen a la derecha con expo-image */}
            <View style={{ width: 120, height: 140, gap: 4 }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    backgroundColor: ReportStates[props.report.state].color,
                    borderRadius: 24,
                    alignContent: 'center',
                    paddingVertical: 2,
                    gap: 6,
                }}>
                    <Ionicons name={ReportStates[props.report.state].icon as any} color={themeColors.text.default}></Ionicons>
                    <ThemedText type="caption">{ReportStates[props.report.state].name}</ThemedText>
                </View>
                <Image
                    source={{ uri: props.report.image_url }}
                    style={{ width: 120, height: 120, borderRadius: 8, borderWidth: 2, borderColor: themeColors.text[500] }}
                    contentFit="cover"
                    placeholder={require('@/src/shared/assets/icons/favicon.png')}
                    transition={300}
                    onError={(e) => console.log('Error loading image:', props.report.image_url)}
                />
            </View>
        </TouchableOpacity >
    );
};