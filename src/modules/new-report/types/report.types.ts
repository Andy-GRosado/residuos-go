import { IBoundingBox } from "@/src/models/bbox.model";
import { ThemeConfigType } from "@/src/store/theme";


// types/report.types.ts
export type ReportIssue = 'mal olor' | 'mala apariencia' | 'presencia de roedores';

export interface ReportFormData {
  title: string;
  description: string;
  issues: ReportIssue[];
  state: string;
  image_url: string;
  bounding_boxes: IBoundingBox[];
  latitude: number;
  longitude: number;
}

export interface ReportFormProps {
  control: any;
  onSubmit: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
  photoUri: string;
  themeColors: ThemeConfigType;
  containerProps?: any;
}