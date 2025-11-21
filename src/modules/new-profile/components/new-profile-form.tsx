import { ControlledInput } from "@/src/shared/components/input/controlled-input";
import BasicInput from "@/src/shared/components/input/input";
import PhoneNumberTextInput from "@/src/shared/components/input/input-phone-number";
import PrimaryButton from "@/src/shared/components/primary-button";
import ThemedText from "@/src/shared/components/themed-text";
import { ThemedTextBar } from "@/src/shared/components/themed-text-bar";
import { useAppForm } from "@/src/shared/hooks/use-app-form";
import { useAuth } from "@/src/shared/hooks/use-auth";
import { useModal } from "@/src/shared/hooks/use-modal";
import { View, ViewProps } from "react-native";
import { ProfileFormData, profileSchema } from "../schemas/new-profile.schema";


export type NewProfileFormProps = {
    containerProps?: ViewProps,
    handleAfterCreateProfile?: () => any
}

export function NewProfileForm(props: NewProfileFormProps) {
    const { getProfile, createProfile } = useAuth();
    const { showModal } = useModal();
    
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useAppForm(profileSchema, {
        names: '',
        last_names: '',
        username: '',
        gender: "male" as 'male' | 'female' | 'other',
        phone_number: '',
        photo_url: '',
    })

    const onCreateProfile = async (data: ProfileFormData) => {
        try {
            await createProfile(
                data.names,
                data.last_names,
                data.username,
                data.gender,
                Number(data.phone_number),
                data.photo_url ?? ''
            )
            await getProfile()
            props.handleAfterCreateProfile && props.handleAfterCreateProfile();
        } catch (error: any) {
            showModal({ title: 'Error al guardar perfil', message: error.message, type: 'info' });
        }
    }

    const onSubmit = handleSubmit(onCreateProfile);

    return (
        <View 
            {...props.containerProps}
            style={[
                { gap: 12, padding: 20 },
                props.containerProps?.style
            ]}
        >
            {/* Name */}
            <ControlledInput
                name="names"
                control={control}
                placeholder="Nombres"
            >
                <BasicInput></BasicInput>
            </ControlledInput>

            {/* LastNames */}
            <ControlledInput
                name="last_names"
                control={control}
                placeholder="Apellidos"
            >
                <BasicInput></BasicInput>
            </ControlledInput>

            {/* Username */}
            <ControlledInput
                name="username"
                control={control}
                placeholder="Nombre de usuario"
            >
                <BasicInput></BasicInput>
            </ControlledInput>

            {/* Gender */}
            <ControlledInput
                name="gender"
                control={control}
                placeholder="Gender"
            >
                <BasicInput></BasicInput>
            </ControlledInput>

            {/* Phone number */}
            <ControlledInput
                name="phone_number"
                control={control}
                placeholder="Número telefonico"
            >
                <PhoneNumberTextInput></PhoneNumberTextInput>
            </ControlledInput>

            <PrimaryButton onPress={onSubmit}>
                <ThemedTextBar style={{ fontWeight: 'bold' }}>
                    {isSubmitting ? "Guardando..." : "Guardar"}
                </ThemedTextBar>
            </PrimaryButton>

            <View>
                <ThemedText>
                    (*) Todo reporte de acumulación de residuos contribuye a
                    reducir su presencia
                </ThemedText>
            </View>
        </View>
    );

}
