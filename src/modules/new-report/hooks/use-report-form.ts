// hooks/forms/use-report-form.ts
import { TensorBoundingBox } from '@/src/models/bbox.model';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Location from 'expo-location';
import { useForm } from 'react-hook-form';
import { reportSchema } from '../types/schemas/report.schema';

export const useReportForm = (photoUri: string, bbox: TensorBoundingBox[], location: Location.LocationObjectCoords) => {
  const methods = useForm({
    resolver: yupResolver(reportSchema),
    defaultValues: {
      title: '',
      description: '',
      issues: [],
      state: 'pending',
      image_url: photoUri,
      bounding_boxes: bbox,
      latitude: location.latitude,
      longitude: location.longitude
    },
    mode: 'onTouched'
  });

  return methods;
};