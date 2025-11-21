// hooks/forms/use-report-form.ts
import { IBoundingBox } from '@/src/models/bbox.model';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { ReportFormData } from '../types/report.types';
import { reportSchema } from '../types/schemas/report.schema';

export const useReportForm = (photoUri: string, bbox: IBoundingBox[]) => {
  const methods = useForm<ReportFormData>({
    resolver: yupResolver(reportSchema),
    defaultValues: {
      title: '',
      description: '',
      issues: [],
      state: 'pending',
      image_url: photoUri,
      bounding_boxes: bbox,
      latitude: 0,
      longitude: 0
    },
    mode: 'onChange'
  });

  return methods;
};