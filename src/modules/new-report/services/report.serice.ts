// services/report-service.ts
import { supabase } from '@/utils/supabase';

export interface ReportCreateData {
  title: string;
  description?: string;
  issues: string[];
  state: string;
  image_url: string;
  bounding_boxes: any[];
  latitude: number | null;
  longitude: number | null;
  created_by: string;
}

class ReportService {
  async create(reportData: ReportCreateData) {
    const { data, error } = await supabase
      .from("reports")
      .insert([reportData])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      throw new Error(`Error al crear reporte: ${error.message}`);
    }

    return data;
  }

  async uploadImage(uri: string): Promise<string> {
    try {
      if (!uri) throw new Error("No image provided");

      const response = await fetch(uri);
      const arrayBuffer = await response.arrayBuffer();

      const fileName = `reports/${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;

      const { data, error } = await supabase.storage
        .from("report-images")
        .upload(fileName, arrayBuffer, {
          contentType: "image/jpeg",
          cacheControl: '3600'
        });

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from("report-images")
        .getPublicUrl(fileName);

      return publicUrlData.publicUrl;

    } catch (error: any) {
      console.error("Error uploading image:", error);
      throw new Error(`Error al subir imagen: ${error.message}`);
    }
  }
}

export const reportService = new ReportService();