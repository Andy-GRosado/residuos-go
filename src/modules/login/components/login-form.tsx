import { ControlledInput } from "@/src/shared/components/input/controlled-input";
import EmailTextInput from "@/src/shared/components/input/input-email";
import PasswordTextInput from "@/src/shared/components/input/input-password";
import PrimaryButton from "@/src/shared/components/primary-button";
import ThemedText from "@/src/shared/components/themed-text";
import ThemedView from "@/src/shared/components/themed-view";
import { useAppForm } from "@/src/shared/hooks/use-app-form";
import { useAuth } from "@/src/shared/hooks/use-auth";
import { useModal } from "@/src/shared/hooks/use-modal";
import { useThemeColors } from "@/src/shared/hooks/use-theme-color";
import { ThemeConfigType } from "@/src/store/theme";
import { View, ViewProps } from "react-native";
import { LoginFormData, loginSchema } from "../schemas/login.schema";



export type LoginFormProps = {
    containerProps?: ViewProps,
    handleAfterLogin?: () => any
}

export function LoginForm(props: LoginFormProps) {
    const themeColors = useThemeColors() as ThemeConfigType;
    const { signIn } = useAuth();
    const { showModal } = useModal();

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
        setError,
        reset
    } = useAppForm(loginSchema, {
        email: '',
        password: '',
    })

    const onLoginSubmit = async (data: LoginFormData) => {
        try {
            console.log(data.email, data.password);
            await signIn(data.email, data.password);
            reset();

            (props.handleAfterLogin) && props.handleAfterLogin();
        } catch (error: any) {
            showModal({ title: "Inicio de sesión fallido", message: error.message, type: 'error' })
        }
    }

    const onSubmit = handleSubmit(onLoginSubmit);

    return (
        <ThemedView
            {...props}
        >
            <View style={{ gap: 12 }}>
                <ControlledInput
                    name="email"
                    control={control}
                >
                    <EmailTextInput />
                </ControlledInput>

                <ControlledInput
                    name="password"
                    control={control}
                >
                    <PasswordTextInput />
                </ControlledInput>
            </View>

            <View style={{ marginTop: 24 }}>
                <PrimaryButton onPress={onSubmit}>
                    <ThemedText type={"bodyBold"} style={{ color: themeColors.text[100] }}>
                        {isSubmitting ? 'Ingresando ...' : 'Ingresar'}
                    </ThemedText>
                </PrimaryButton>
            </View>
        </ThemedView>
    )
}
