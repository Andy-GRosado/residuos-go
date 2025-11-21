import * as yup from 'yup';

// Esquema de registro
export const registerSchema = yup.object({
    email: yup
        .string()
        .required('El email es obligatorio')
        .email('Formato de email inválido')
        .matches(
            /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
            'Dominio debe ser válido (ej: usuario@dominio.com)'
        ),

    password: yup
        .string()
        .required('La contraseña es obligatoria')
        .min(8, 'La contraseña debe tener al menos 8 caracteres'),
    confirmPassword: yup
        .string()
        .required('Confirma tu contraseña')
        .oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),
});

export type RegisterFormData = yup.InferType<typeof registerSchema>;