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
    .optional()
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
      x: yup.number().required(),
      y: yup.number().required(),
      width: yup.number().required(),
      height: yup.number().required(),
      label: yup.string().required()
    }))
    .required('Las bounding boxes son obligatorias'),

  latitude: yup
    .number()
    .required('La latitud es obligatoria')
    .min(-90, 'La latitud debe ser entre -90 y 90')
    .max(90, 'La latitud debe ser entre -90 y 90'),

  longitude: yup
    .number()
    .required('La longitud es obligatoria')
    .min(-180, 'La longitud debe ser entre -180 y 180')
    .max(180, 'La longitud debe ser entre -180 y 180')
});