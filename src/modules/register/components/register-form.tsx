// app/register.tsx
import { ControlledInput } from "@/src/shared/components/input/controlled-input";
import EmailTextInput from "@/src/shared/components/input/input-email";
import PasswordTextInput from "@/src/shared/components/input/input-password";
import PrimaryButton from "@/src/shared/components/primary-button";
import ThemedText from "@/src/shared/components/themed-text";
import { useAppForm } from "@/src/shared/hooks/use-app-form";
import { useAuth } from "@/src/shared/hooks/use-auth";
import { useModal } from "@/src/shared/hooks/use-modal";
import { useRouter } from "expo-router";
import React from "react";
import { View, ViewProps } from "react-native";
import { RegisterFormData, registerSchema } from "../schemas/register.schema";


export type RegisterFormProps = {
    containerProps?: ViewProps,
    handleAfterRegister?: () => any
}

export default function RegisterForm(props: RegisterFormProps) {
    const { signUp } = useAuth();
    const { showModal } = useModal();
    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
        setError,
        reset,
    } = useAppForm(registerSchema, {
        email: '',
        password: '',
        confirmPassword: '',
    });

    // Función que se ejecuta cuando el formulario es válido
    const onRegisterSubmit = async (data: RegisterFormData) => {
        try {
            console.log(data.email, data.password, data.confirmPassword);
            await signUp(data.email, data.password);

            showModal({ title: "Éxito", message: "Registro completado", type: "success" });
            reset();
            props.handleAfterRegister && props.handleAfterRegister();
        } catch (error: any) {
            if (error.message.includes('email')) {
                setError('email', { message: 'Este correo ya está registrado' });
            } else {
                showModal({ title: "Error", message: error.message, type: "error" });
            }
        }
    };

    const onSubmit = handleSubmit(onRegisterSubmit);

    return (
        <View
            {...props.containerProps}
            style={[
                { gap: 18 },
                props.containerProps && props.containerProps.style
            ]}
        >
            <View style={{ gap: 12 }}>
                {/* Email Input */}
                <ControlledInput
                    name="email"
                    control={control}
                >
                    <EmailTextInput />
                </ControlledInput>

                {/* Password Input */}
                <ControlledInput
                    name="password"
                    control={control}
                >
                    <PasswordTextInput />
                </ControlledInput>

                {/* Confirm Password Input */}
                <ControlledInput
                    name="confirmPassword"
                    control={control}
                    placeholder="Confirmar contraseña"
                >
                    <PasswordTextInput />
                </ControlledInput>
            </View>

            {/* Botón de Registro */}
            <PrimaryButton onPress={onSubmit}>
                <ThemedText style={{ fontWeight: "bold" }}>
                    {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
                </ThemedText>
            </PrimaryButton>
        </View>

    );
}