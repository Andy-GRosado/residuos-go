import { IReport } from "@/src/models/report.model";
import { IFromSupabase } from "@/src/models/supabase.model";
import Tag, { ColorTypes } from "@/src/shared/components/tag";
import ThemedText from "@/src/shared/components/themed-text";
import { useThemeColors } from "@/src/shared/hooks/use-theme-color";
import { formatUTCDateToCalendarFormat } from "@/src/shared/utils/utils";
import { ThemeConfigType } from "@/src/store/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Pressable, ScrollView, View } from "react-native";

const IssueColorHashmap: Record<string, ColorTypes> = {
    'mal olor': 'orange',
    'mal aspecto': 'purple',
    'roedores': 'red',
    'mala apariencia': 'yellow',
    'contaminación': 'brown',
}

export type ReportCardProps = {
    report: IReport & IFromSupabase;
    onPress?: () => any;

}
export function ReportCard(props: ReportCardProps) {
    const themeColors = useThemeColors() as ThemeConfigType;

    return (
        <View
            style={{
                flexDirection: "row",
                borderRadius: 12,
                marginHorizontal: 16,
                marginVertical: 8,
                padding: 12,
                borderWidth: 2,
                borderColor: themeColors.background[400],
                backgroundColor: themeColors.background[400],
            }}
        >
            <Pressable
                onPress={() => { props.onPress && props.onPress()}}
                style={({ pressed }) => ({
                    opacity: pressed ? 0.7 : 1,
                })}
            >

                {/* Imagen */}
                <View style={{
                    width: 100,
                    height: 120,
                    marginRight: 12,
                    borderRadius: 8,
                    backgroundColor: themeColors.background[300],
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    {props.report.image_url ? (
                        <Image
                            source={{ uri: props.report.image_url }}
                            style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: 8,
                            }}
                            resizeMode="cover"
                            transition={200}
                        />
                    ) : (
                        <Ionicons
                            name="image-outline"
                            size={32}
                            color={themeColors.text[400]}
                        />
                    )}
                </View>
            </Pressable>

            {/* Contenido */}
            <View style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
            }}>
                <View style={{
                    flex: 1,
                    marginRight: 12,
                    justifyContent: 'space-between',
                }}>
                    {/* Título y descripción */}
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <ThemedText
                                type="bodyBold"
                                numberOfLines={1}
                                style={{ maxWidth: 212 }}
                            >
                                {props.report.title || `Reporte ${props.report.id.slice(0, 8)}`}
                            </ThemedText>
                            <ThemedText type="caption" style={{ color: themeColors.text[500] }}>
                                {props.report.created_at ? formatUTCDateToCalendarFormat(props.report.created_at) : "Sin fecha"}
                            </ThemedText>
                        </View>
                        <ThemedText
                            numberOfLines={2}
                            style={{
                                color: themeColors.text[400],
                                lineHeight: 16,
                            }}
                        >
                            {props.report.description || "Sin descripción"}
                        </ThemedText>
                    </View>

                    {/* Tags de issues - ahora debajo y con wrap */}
                    {props.report.issues && props.report.issues.length > 0 && (
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={{
                                flexGrow: 0, // No se expande
                                flexShrink: 0, // No se reduce
                            }}
                            contentContainerStyle={{
                                flexGrow: 0,
                                gap: 4,
                            }}
                        >
                            {props.report.issues.map((issue, index) => (
                                <Tag
                                    key={index}
                                    color={IssueColorHashmap[issue] ?? 'gray'}
                                    text={issue}
                                />
                            ))}
                        </ScrollView>
                    )}
                </View>
            </View>
        </View>
    )
}
