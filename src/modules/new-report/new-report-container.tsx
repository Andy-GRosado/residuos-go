import { IBoundingBox } from "@/src/models/bbox.model";
import { ThemedTextBar } from "@/src/shared/components/themed-text-bar";
import ThemedView from "@/src/shared/components/themed-view";
import { ThemedViewBar } from "@/src/shared/components/themed-view-bar";
import { useAuth } from "@/src/shared/hooks/use-auth";
import { useModal } from "@/src/shared/hooks/use-modal";
import { useThemeColors } from "@/src/shared/hooks/use-theme-color";
import { ThemeConfigType } from "@/src/store/theme";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { FormProvider } from 'react-hook-form'; // ← Agrega este import
import { ScrollView } from "react-native";
import { useLocation } from "../maps/hooks/use-location";
import ReportForm from "./components/form-report";
import PhotoReport from "./components/photo-report";
import { useReportForm } from "./hooks/use-report-form";
import { reportService } from "./services/report.serice";


export type NewReportContainerProps = {
  photoUri: string,
  bounding_box: IBoundingBox[]
}

export default function NewReportContainer(props: NewReportContainerProps) {
  const router = useRouter();
  const { showModal } = useModal();
  const themeColors = useThemeColors() as ThemeConfigType;
  // const { photo, setPhoto } = useCamera();
  const { profile } = useAuth();
  const { location } = useLocation();

  // Hook del formulario
  const formMethods = useReportForm(props.photoUri, props.bounding_box);
  const { handleSubmit, formState: { isSubmitting } } = formMethods;

  // Manejo del envío del formulario
  const handleFormSubmit = useCallback(async (formData: any) => {
    try {
      if (!profile?.id) {
        throw new Error("Debes iniciar sesión para crear reportes");
      }

      // Preparar datos del reporte
      const reportData = {
        ...formData,
        created_by: profile.id,
        state: "pending" as const,
        latitude: location?.coords.latitude || null,
        longitude: location?.coords.longitude || null,
      };

      console.log("Enviando reporte:", reportData);

      // Insertar en la base de datos
      await reportService.create(reportData);

      showModal({
        title: "¡Reporte publicado!",
        message: "Tu reporte fue publicado correctamente",
        type: "success",
      });

      // Navegar después de mostrar el modal
      setTimeout(() => {
        router.replace("/(app)/map");
      }, 1500);

    } catch (error: any) {
      console.error("Submit error:", error);
      showModal({
        title: "Error al publicar",
        message: error.message || "Ocurrió un error al publicar el reporte",
        type: "error",
      });
    }
  }, [profile, location, router, showModal]);

  // Manejo de cancelación
  const handleCancel = useCallback(() => {
    if (isSubmitting) return;

    
    router.back();
  }, [isSubmitting, router]);

  const onSubmit = handleSubmit(handleFormSubmit);

  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedViewBar
        style={{
          paddingTop: 55,
          paddingBottom: 20,
          alignItems: "center",
        }}
      >
        <ThemedTextBar type="title">Nuevo Reporte</ThemedTextBar>
      </ThemedViewBar>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Preview de imagen */}
        <PhotoReport
          themeColors={themeColors}
          photoUri={props.photoUri}
        />

        {/* Formulario Controlado */}
        <FormProvider {...formMethods}>
          <ReportForm
            control={formMethods.control}
            onSubmit={onSubmit}
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
            photoUri={props.photoUri}
            themeColors={themeColors}
          />
        </FormProvider>
      </ScrollView>
    </ThemedView>
  );
}