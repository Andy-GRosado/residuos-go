import ThemedLogoHeaderBar from "@/components/ui/bar/themed-logo-header-bar";
import ThemedText from "@/components/ui/themed-text";
import ThemedView from "@/components/ui/themed-view";
import { ThemeConfigType } from "@/constants/theme";
import { useAuth } from "@/hooks/use-auth";
import { useThemeColors } from "@/hooks/use-theme-color";
import { supabase } from "@/utils/supabase";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    StyleSheet,
    View,
} from "react-native";

// Tipo para los reportes (ajusta según tu schema)
type Report = {
    id: string;
    image_url: string;
    title: string;
    description?: string;
    state?: string;
    issues: string[];
    created_by: string;
    created_at: Date;
};

export default function HistoryScreen() {
    const { user } = useAuth();
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const themeColors = useThemeColors() as ThemeConfigType;
    const router = useRouter();

    useEffect(() => {
        if (!user?.id) return;

        const fetchUserReports = async () => {
            try {
                setLoading(true);
                setError(null);

                const { data, error: supabaseError } = await supabase
                    .from("reports")
                    .select("*")
                    .eq("created_by", user.id)
                    .order("created_at", { ascending: false });

                if (supabaseError) {
                    throw supabaseError;
                }

                setReports(data || []);
            } catch (err) {
                console.error("Error fetching reports:", err);
                setError("Error al cargar los reportes");
            } finally {
                setLoading(false);
            }
        };

        fetchUserReports();
    }, [user?.id]);

    if (loading) {
        return (
            <ThemedView>
                <ActivityIndicator size="large" color="#fff" />
                <ThemedText style={{}}>Cargando reportes...</ThemedText>
            </ThemedView>
        );
    }

    if (error) {
        return (
            <ThemedView>
                <ThemedText style={{}}>{error}</ThemedText>
            </ThemedView>
        );
    }

    return (
        <ThemedView style={{ flex: 1 }}>
            <ThemedLogoHeaderBar title="Mis reportes"></ThemedLogoHeaderBar>
            {reports.length === 0 ? (
                <ThemedView>
                    <ThemedText>No hay reportes disponibles</ThemedText>
                </ThemedView>
            ) : (
                <FlatList
                    data={reports}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => {
                                // console.log('ir a reporte', item.id);
                                router.push(`/(app)/reports/${item.id}`);
                            }}
                        >
                            <View
                                style={{
                                    height: 100,
                                    flexDirection: "row",
                                    borderRadius: 12,
                                    marginHorizontal: 16,
                                    marginVertical: 8,
                                    padding: 12,
                                    minHeight: 100,
                                    borderWidth: 2,
                                    borderColor: themeColors.background[400],
                                }}
                            >
                                {/* Imagen a la izquierda */}
                                <View style={styles.imageContainer}>
                                    {item.image_url ? (
                                        <Image
                                            source={{ uri: item.image_url }}
                                            style={styles.reportImage}
                                            resizeMode="cover"
                                        />
                                    ) : (
                                        <View style={{}}>
                                            <Ionicons
                                                name="image"
                                                size={24}
                                                color={
                                                    themeColors.background[100]
                                                }
                                            />
                                        </View>
                                    )}
                                </View>

                                {/* Contenido principal */}
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <View
                                        style={{
                                            flex: 1,
                                            marginRight: 16,
                                        }}
                                    >
                                        <ThemedText
                                            style={{
                                                fontSize: 16,
                                                fontWeight: "bold",
                                            }}
                                            numberOfLines={1}
                                        >
                                            {item.title || `Reporte ${item.id}`}
                                        </ThemedText>
                                        <ThemedText
                                            style={{
                                                fontSize: 14,
                                                color: "#666",
                                                lineHeight: 18,
                                            }}
                                            numberOfLines={2}
                                        >
                                            {item.description ||
                                                "Sin descripción disponible"}
                                        </ThemedText>
                                    </View>

                                    {/* Fecha en esquina superior derecha */}
                                    <View style={{ alignSelf: "flex-start" }}>
                                        <ThemedText
                                            style={{
                                                fontSize: 12,
                                                color: "#888",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {item.created_at
                                                ? new Date(
                                                      item.created_at
                                                  ).toLocaleDateString()
                                                : "Fecha no disponible"}
                                        </ThemedText>
                                    </View>
                                </View>
                            </View>
                        </Pressable>
                    )}
                    contentContainerStyle={{ paddingVertical: 8 }}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        width: 80,
        height: "auto",
        marginRight: 12,
    },
    reportImage: {
        width: "100%",
        height: "100%",
        borderRadius: 8,
    },
});
