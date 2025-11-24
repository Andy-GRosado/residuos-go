import { TensorBoundingBox } from "@/src/models/bbox.model";
import { ThemedTextBar } from "@/src/shared/components/themed-text-bar";
import ThemedView from "@/src/shared/components/themed-view";
import { ThemedViewBar } from "@/src/shared/components/themed-view-bar";
import { useAuth } from "@/src/shared/hooks/use-auth";
import { useModal } from "@/src/shared/hooks/use-modal";
import { useThemeColors } from "@/src/shared/hooks/use-theme-color";
import { ThemeConfigType } from "@/src/store/theme";
import * as Location from 'expo-location';
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FormProvider } from 'react-hook-form'; // ← Agrega este import
import { ScrollView } from "react-native";
import ReportForm from "./components/form-report";
import PhotoReport from "./components/photo-report";
import { useReportForm } from "./hooks/use-report-form";
import { reportService } from "./services/report.serice";

export type NewReportContainerProps = {
  photoUri: string,
  boundingBox: TensorBoundingBox[]
  location: Location.LocationObjectCoords
}

export default function NewReportContainer(props: NewReportContainerProps) {
  const themeColors = useThemeColors() as ThemeConfigType;
  const router = useRouter();

  const { showModal } = useModal();
  const { profile } = useAuth();

  // Hook del formulario
  const formMethods = useReportForm(props.photoUri, props.boundingBox, props.location);
  const { handleSubmit, formState } = formMethods;
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    reportService.uploadImage(props.photoUri);
  }, [])
  
  // Manejo del envío del formulario
  const handleFormSubmit = useCallback(async (formData: any) => {
    try {
      console.log(formData);
      if (!profile?.id) {
        throw new Error("Debes iniciar sesión para crear reportes");
      }

      const image_url = await reportService.uploadImage(props.photoUri);

      // Preparar datos del reporte
      const reportData = {
        ...formData,
        created_by: profile.id,
        image_url: image_url
      };
      
      // Insertar en la base de datos
      console.log("Enviando reporte:", reportData);
      
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
  }, [showModal, router, profile?.id]); // ← Agregar profile.id como dependencia

  const handleManualSubmit = useCallback(async () => {
    try {
      // Validar manualmente
      setIsSubmitting(true);
      const formData = formMethods.getValues();
      console.log('Form data:', formData);

      // Llamar tu función manualmente
      await handleFormSubmit(formData);

      setIsSubmitting(false);
    } catch (error) {
      console.error('Manual submit error:', error);
    }
  }, [formMethods, handleFormSubmit]);

  // Manejo de cancelación
  const handleCancel = useCallback(() => {
    if (isSubmitting) return;
    router.back();
  }, [isSubmitting, router]);

  // CORRECTO: Usar handleFormSubmit directamente
  // const onHandleSubmit = handleSubmit(handleFormSubmit);

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
            onSubmit={handleManualSubmit}
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