// schemas/validation-schemas.ts
import * as yup from 'yup';

// Esquema de login
export const loginSchema = yup.object({
    email: yup
        .string()
        .required('El email es obligatorio')
        .email('Formato de email inválido'),
    password: yup
        .string()
        .required('La contraseña es obligatoria'),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;
