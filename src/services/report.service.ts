// services/report-service.ts
import { IReport } from '@/src/models/report.model';
import { supabase } from '@/src/shared/utils/supabase';
import { calculateDistance } from '@/src/shared/utils/utils';
import { IFromSupabase } from '../models/supabase.model';

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

export class ReportService {
    static async create(reportData: ReportCreateData) {
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

    static async uploadImage(uri: string): Promise<string> {
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

    static async getAproximatedReports(lat: number, lng: number, radiusKm: number): Promise<IReport[]> {
        const latDelta = radiusKm / 111.32;
        const lngDelta = radiusKm / (111.32 * Math.cos(lat * Math.PI / 180));

        const { data, error } = await supabase
            .from("reports")
            .select("*")
            .gte('latitude', lat - latDelta)
            .lte('latitude', lat + latDelta)
            .gte('longitude', lng - lngDelta)
            .lte('longitude', lng + lngDelta);

        if (error) {
            console.error('Error fetching near markers:', error);
            throw error;
        }
        console.log(data);

        const nearMarkers = data?.filter((marker: IReport) => {
            const distance_in_meters = calculateDistance(lat, lng, Number(marker.latitude), Number(marker.longitude));
            return distance_in_meters <= radiusKm * 1000;
        }) || [];

        return nearMarkers as IReport[];
    }

    static async getAllReports(): Promise<(IReport & IFromSupabase)[]> {
        const { data, error } = await supabase
            .from("reports")
            .select("*")
        if (error) { throw error };

        return data as (IReport & IFromSupabase)[];
    }

    static async getReportsInArea() {
        const reports = await this.getAllReports();
        // const reports_filtered = reports.filter((report) => turf.booleanPointInPolygon([Number(report.latitude), Number(report.longitude)], VillaElSalvadorPolygon));
        const reports_filtered = reports.filter((report) => report);
        return reports_filtered;
    }
}
