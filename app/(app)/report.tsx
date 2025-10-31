import { ThemedTextBar } from "@/components/ui/bar/themed-text-bar";
import ThemedCheckbox from "@/components/ui/checkbox/checkbox";
import TextInput from "@/components/ui/input/input-text";
import TextAreaInput from "@/components/ui/input/input-text-area";
import ThemedText from "@/components/ui/themed-text";
import { ThemeConfigType } from "@/constants/theme";
import { useAuth } from "@/hooks/use-auth";
import { useCamera } from "@/hooks/use-camera";
import { useLocation } from "@/hooks/use-location";
import { useModal } from "@/hooks/use-modal";
import { useThemeColors } from "@/hooks/use-theme-color";
import { supabase } from "@/utils/supabase";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";

export default function ReportScreen() {
    const router = useRouter();
    const { photoUri } = useLocalSearchParams();
    const { showModal } = useModal();
    const themeColors = useThemeColors() as ThemeConfigType;
    const { photo, setPhoto } = useCamera();
    const { user } = useAuth();
    const {location, updateLocation} = useLocation()

    // Usar la foto del contexto o del parámetro de navegación
    const currentPhotoUri = photo?.uri || (photoUri as string);

    // Campos del formulario
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [issues, setIssues] = useState({
        smell: false,
        appearance: false,
        rodents: false,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Función para subir imagen a Supabase Storage
    const uploadImage = async (uri: string): Promise<string | null> => {
        try {
            console.log("Iniciando subida de imagen:", uri);

            // Convertir la URI a ArrayBuffer usando fetch
            const response = await fetch(currentPhotoUri);
            console.log(response);
            const arrayBuffer = await response.arrayBuffer();

            // Crear un nombre único para el archivo
            const fileName = `reports/${Date.now()}-${Math.random()
                .toString(36)
                .substring(7)}.jpg`;

            console.log("Subiendo archivo:", fileName);
            console.log(arrayBuffer);
            // Subir la imagen a Supabase Storage usando ArrayBuffer
            const { data, error } = await supabase.storage
                .from("report-images")
                .upload(fileName, arrayBuffer, {
                    contentType: "image/jpeg",
                });

            if (error) {
                console.error("Error uploading image:", error);
                throw new Error(`Error al subir imagen: ${error.message}`);
            }

            const { data: publicUrlData } = supabase.storage
                .from("report-images")
                .getPublicUrl(fileName);

            console.log("Imagen subida exitosamente:", publicUrlData.publicUrl);
            
            return publicUrlData.publicUrl;
        } catch (error) {
            console.error("Error in uploadImage:", error);
            throw error;
        }
    };

    const handleSubmit = async () => {
        if (!title.trim()) {
            showModal({
                title: "Título necesario",
                message: "Por favor ingresa un título para el reporte",
                type: "info",
            });
            return;
        }

        try {
            setIsSubmitting(true);

            let imageUrl = null;

            // Subir la imagen si existe
            if (currentPhotoUri) {
                console.log("Subiendo imagen:", currentPhotoUri);
                imageUrl = await uploadImage(currentPhotoUri);
                if (!imageUrl) {
                    showModal({
                        title: "Error",
                        message: "No se pudo subir la imagen",
                        type: "info",
                    });
                    return;
                }
            }

            // Preparar los datos para Supabase
            const current_location = await updateLocation()
            
            const selected_issues = [];
            if (issues.smell) { selected_issues.push('mal olor') }
            if (issues.appearance) { selected_issues.push('mala apariencia') }
            if (issues.rodents) { selected_issues.push('presencia de roedores') }

            const reportData = {
                title: title.trim(),
                description: description.trim(),
                image_url: imageUrl,
                latitude: current_location?.coords.latitude,
                longitude: current_location?.coords.longitude,
                bounding_boxes: [{}],
                created_by: user?.id,
                state: "pending",
                issues: selected_issues
            };

            console.log("Enviando datos del reporte:", reportData);

            // Insertar en la tabla de Supabase
            const { data, error } = await supabase
                .from("reports")
                .insert([reportData])
                .select();

            if (error) {
                console.error("Supabase error:", error);
                throw new Error(`Error al guardar reporte: ${error.message}`);
            }

            console.log("Reporte creado exitosamente:", data);

            // Limpiar la foto del contexto después de usarla exitosamente
            if (photo) {
                setPhoto(undefined);
            }

            showModal({
                title: "Publicación exitosa",
                message: "Tu reporte fue publicado correctamente",
                type: "success",
            });

            // Navegar después de mostrar el modal
            setTimeout(() => {
                router.push("/(app)/map");
            }, 1500);
        } catch (err: any) {
            console.error("Submit error:", err);
            showModal({
                title: "Error al publicar reporte",
                message: err.message || "Algo salió mal al publicar el reporte",
                type: "error",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        // Limpiar la foto si cancelamos
        if (photo) {
            setPhoto(undefined);
        }
        router.back();
    };

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: themeColors.background.default }}
            contentContainerStyle={{ flexGrow: 1 }}
        >
            {/* Imagen de cabecera */}
            {currentPhotoUri && (
                <Image
                    source={{ uri: currentPhotoUri }} // Corregido: usar currentPhotoUri
                    style={styles.headerImage}
                    resizeMode="cover"
                />
            )}

            <View style={styles.formContainer}>
                <ThemedText type="subtitle">Título *</ThemedText>
                <TextInput
                    style={styles.input}
                    placeholder="Escribe un título"
                    value={title}
                    onChangeText={setTitle}
                    maxLength={100}
                    editable={!isSubmitting}
                />

                <ThemedText type="subtitle" style={styles.label}>
                    Descripción
                </ThemedText>
                <TextAreaInput
                    style={styles.textArea}
                    placeholder="Descripción opcional"
                    value={description}
                    onChangeText={setDescription}
                    maxLength={500}
                    editable={!isSubmitting}
                />

                <ThemedText type="subtitle" style={styles.label}>
                    Observaciones
                </ThemedText>
                <View style={styles.checkboxGroup}>
                    <ThemedCheckbox
                        value={issues.smell}
                        onValueChange={(v: boolean) =>
                            setIssues({ ...issues, smell: v })
                        }
                        label="Mal olor"
                        disabled={isSubmitting}
                    />
                    <ThemedCheckbox
                        value={issues.appearance}
                        onValueChange={(v: boolean) =>
                            setIssues({ ...issues, appearance: v })
                        }
                        label="Mal aspecto"
                        disabled={isSubmitting}
                    />
                    <ThemedCheckbox
                        value={issues.rodents}
                        onValueChange={(v: boolean) =>
                            setIssues({ ...issues, rodents: v })
                        }
                        label="Presencia de roedores"
                        disabled={isSubmitting}
                    />
                </View>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.cancelButton]}
                        onPress={handleCancel}
                        disabled={isSubmitting}
                    >
                        <ThemedText style={styles.cancelButtonText}>
                            {isSubmitting ? "Cancelando..." : "Cancelar"}
                        </ThemedText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.button,
                            styles.submitButton,
                            {
                                backgroundColor:
                                    themeColors.bar.background.default,
                                opacity: isSubmitting ? 0.6 : 1,
                            },
                        ]}
                        onPress={handleSubmit}
                        disabled={isSubmitting}
                    >
                        <ThemedTextBar>
                            {isSubmitting ? "Enviando..." : "Publicar"}
                        </ThemedTextBar>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        width: "100%",
        height: 250,
    },
    formContainer: {
        padding: 16,
        flex: 1,
    },
    label: {
        marginTop: 16,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginTop: 6,
        fontSize: 16,
    },
    textArea: {
        height: 100,
        textAlignVertical: "top",
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    checkboxGroup: {
        marginTop: 8,
    },
    buttonsContainer: {
        flexDirection: "row",
        gap: 12,
        marginTop: 24,
        marginBottom: 24,
    },
    button: {
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: "center",
        flex: 1,
    },
    submitButton: {
        // El color viene de themeColors
    },
    cancelButton: {
        borderWidth: 1,
    },
    cancelButtonText: {
        fontWeight: "600",
    },
});
