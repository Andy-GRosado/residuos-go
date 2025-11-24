// schemas/report.schema.ts
import * as yup from 'yup';

export const reportSchema = yup.object({
  title: yup
    .string()
    .required('El título es obligatorio')
    .min(3, 'El título debe tener al menos 3 caracteres')
    .max(100, 'El título no puede exceder 100 caracteres'),

  description: yup
    .string()
    .max(500, 'La descripción no puede exceder 500 caracteres'),

  state: yup
    .string()
    .required('El estado es obligatorio')
    .oneOf(['pending', 'in_progress', 'resolved', 'closed'], 'Estado no válido'),

  issues: yup
    .array(yup.string().oneOf(['mal olor', 'mala apariencia', 'presencia de roedores']))
    .required('Los issues son obligatorios')
    .min(1, 'Debe haber al menos un issue'),

  image_url: yup
    .string()
    .required('La URL de la imagen es obligatoria')
    .url('La URL de la imagen no es válida'),

  bounding_boxes: yup
    .array(yup.object({
      x1: yup.number().required(),
      y1: yup.number().required(),
      x2: yup.number().required(),
      y2: yup.number().required(),
      score: yup.number().required(),
      label: yup.string().required()
    }))
    .required('Los bounding boxes son obligatorias'),

  latitude: yup
    .number()
    .required('La latitud es obligatoria'),

  longitude: yup
    .number()
    .required('La longitud es obligatoria')
});