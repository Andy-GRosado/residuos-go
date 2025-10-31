// app/report/[id].tsx
import { ThemedTextBar } from "@/components/ui/bar/themed-text-bar";
import { ThemedViewBar } from "@/components/ui/bar/themed-view-bar";
import PrimaryButton from "@/components/ui/button/primary-button";
import TextInput from "@/components/ui/input/input-text";
import Tag from "@/components/ui/tag/tag";
import ThemedText from "@/components/ui/themed-text";
import ThemedView from "@/components/ui/themed-view";
import { ThemeConfigType } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-color";
import { supabase } from "@/utils/supabase";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, View } from "react-native";

type Report = {
    id: string;
    image_url: string;
    title: string;
    description?: string;
    state?: string;
    issues: string[];
    created_by: string;
    created_at: Date;
    profiles?: {
        username: string;
        email: string;
        full_name: string;
    };
};

type Comment = {
    id: string;
    report_id: string;
    created_by: string;
    created_at: Date;
};

export default function ReportDetail() {
    const { id } = useLocalSearchParams();
    const [report, setReport] = useState<Report | undefined>(undefined);
    const [comments, setComments] = useState<Comment[]>([]);
    const themeColors = useThemeColors() as ThemeConfigType;

    const reportId = Array.isArray(id) ? id[0] : id;

    useEffect(() => {
        const fectch_report = async (id: string) => {
            const { data: report_detail, error: report_error } = await supabase
                .from("reports")
                .select("*")
                .eq("id", id);

            if (report_error) {
                throw new Error(report_error.message);
            }

            setReport(report_detail[0]);

            return report_detail[0] || undefined;
        };

        const fetch_commentaries = async (report_id: string) => {
            const { data: comments, error: comments_error } = await supabase
                .from("comments")
                .select(
                    `*, 
                    created_by:profiles!inner (
                        username,
                        photo_url
                    )
                    `
                )
                .eq("report_id", report_id);

            if (comments_error) {
                console.log(comments_error);
                throw new Error(comments_error.message);
            }

            setComments(comments);
            return comments || undefined;
        };

        (async () => {
            await fectch_report(reportId);
            await fetch_commentaries(reportId);
        })();
    }, []);

    // const postComment = useCallback(async() => {
    //     await supabase.from('comments').insert({
            
    //     })
    // })

    if (!report) {
        return (
            <ThemedView style={{ flex: 1 }}>
                <ThemedViewBar
                    style={{
                        paddingTop: 60,
                        paddingBottom: 40,
                        alignItems: "center",
                    }}
                >
                    <ThemedTextBar type="title">
                        Reporte #{reportId}
                    </ThemedTextBar>
                </ThemedViewBar>
            </ThemedView>
        );
    }

    return (
        <ThemedView style={{ flex: 1 }}>
            <ThemedViewBar
                style={{
                    paddingTop: 55,
                    paddingBottom: 30,
                    alignItems: "center",
                }}
            >
                <ThemedTextBar type="title">Reporte #{reportId}</ThemedTextBar>
            </ThemedViewBar>
            <ScrollView
                style={{
                    margin: 16,
                    gap: 40,
                }}
            >
                {/* Report image */}
                <View
                    style={{
                        position: "relative",
                        borderWidth: 2,
                        borderRadius: 20,
                        borderColor: themeColors.background[200],
                        overflow: "hidden",
                    }}
                >
                    <Image
                        source={{ uri: report.image_url }}
                        style={{ width: "100%", height: 700 }}
                        resizeMode="stretch"
                    />

                    <LinearGradient
                        colors={[
                            "rgba(20, 20, 20, 1)",
                            "rgba(0, 0, 0, 0.7)",
                            "transparent",
                        ]}
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: 80,
                            padding: 16,
                            paddingBlock: 12,
                        }}
                    >
                        <ThemedText type="subtitle">{report.title}</ThemedText>
                    </LinearGradient>
                    <LinearGradient
                        colors={[
                            "transparent",
                            "rgba(0, 0, 0, 0.7)",
                            "rgba(20, 20, 20, 1)",
                        ]}
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
                        <ThemedText style={{ marginBottom: 8 }}>
                            {report.description ?? "Sin descripcion"}
                        </ThemedText>
                        <View style={{ flexDirection: "row", gap: 8 }}>
                            {report.issues.length > 0 ? (
                                report.issues.map((item: string) => {
                                    if (item.includes("mal olor")) {
                                        return (
                                            <Tag
                                                key={item}
                                                color="orange"
                                                text="mal olor"
                                            />
                                        );
                                    }

                                    if (item.includes("aspecto")) {
                                        return (
                                            <Tag
                                                key={item}
                                                color="purple"
                                                text="mal aspecto"
                                            />
                                        );
                                    }

                                    if (item.includes("roedores")) {
                                        return (
                                            <Tag
                                                key={item}
                                                color="red"
                                                text="roedores"
                                            />
                                        );
                                    }

                                    return (
                                        <Tag
                                            color="gray"
                                            text="contaminación"
                                        />
                                    );
                                })
                            ) : (
                                <View></View>
                            )}
                        </View>
                    </LinearGradient>
                </View>

                {/* Line of divition between image and comments */}
                <View
                    style={{
                        flexDirection: "row",
                        width: "100%",
                        marginTop: 16,
                        marginBottom: 16,
                        alignItems: "center",
                        gap: 8,
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            height: 0,
                            borderWidth: 1,
                            borderColor: themeColors.background[200],
                        }}
                    ></View>
                    <ThemedText>{comments.length} Commentarios</ThemedText>
                </View>

                {/* Post a new comment */}
                <View
                    style={{
                        width: "100%",
                        flexDirection: "row",
                        gap: 8,
                        alignItems: "center",
                        marginBottom: 8,
                    }}
                >
                    <Image
                        source={{
                            uri: "https://avatar.iran.liara.run/public/12",
                        }}
                        style={{ width: 40, height: 40 }}
                    ></Image>
                    <TextInput
                        style={{
                            flex: 1,
                            marginBottom: 0,
                            borderColor: themeColors.background[200],
                        }}
                        placeholder="Comenta algo..."
                    />

                    <PrimaryButton onPressCallback={() => {}}>
                        <Ionicons name="send" size={16} color="white" />
                    </PrimaryButton>
                </View>

                {/* Commentaries */}
                <View>
                    {comments.map((item) => {
                        return (
                            <View
                                style={{
                                    width: "100%",
                                    flexDirection: "row",
                                    gap: 8,
                                    alignItems: "center",
                                    marginBottom: 8,
                                }}
                            >
                                <Image
                                    source={{
                                        uri: "https://avatar.iran.liara.run/public/12",
                                    }}
                                    style={{ width: 40, height: 40 }}
                                ></Image>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </ThemedView>
    );
}
