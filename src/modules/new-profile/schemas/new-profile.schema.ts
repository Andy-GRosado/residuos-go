import * as yup from 'yup';

export const profileSchema = yup.object({
    names: yup
        .string()
        .required('El nombre es obligatorio'),

    last_names: yup
        .string()
        .required('Los apellidos son obligatorios'),

    username: yup
        .string()
        .required('El nombre de usuario es obligatorio')
        .min(3, 'El nombre de usuario debe tener al menos 3 caracteres'),

    gender: yup
        .string()
        .oneOf(['male', 'female', 'other'], 'El género no es válido')
        .required('El género es obligatorio'),

    phone_number: yup
        .string()
        .matches(/^[0-9]+$/, 'El número de teléfono debe contener solo números')
        .length(9, 'El número de teléfono debe tener exactamente 9 dígitos')
        .optional(),

    photo_url: yup
        .string()
        .url('La URL de la foto no es válida')
        .optional(),
});

export type ProfileFormData = yup.InferType<typeof profileSchema>;

