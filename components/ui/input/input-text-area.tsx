import { ThemeConfigType } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-color";
import { StyleSheet, TextInputProps } from "react-native";
import BasicInput from "./input";

const styles = StyleSheet.create({
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
    },
});

export default function TextAreaInput(props: TextInputProps) {
    const themeColors = useThemeColors() as ThemeConfigType;
    return (
        <BasicInput
            {...props}
            multiline
            style={[
                styles.input,
                {
                    borderColor: themeColors.text[200],
                    color: themeColors.text.default,
                },
                props.style, // permite sobreescribir estilos desde fuera
            ]}
            placeholder={props.placeholder ?? "Escribe algo..."}
            placeholderTextColor={themeColors.text[500]}
            autoCapitalize="sentences"
            numberOfLines={props.numberOfLines ?? 4}
        />
    );
}
