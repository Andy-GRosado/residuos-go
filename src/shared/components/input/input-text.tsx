import { ThemeConfigType } from "@/src/store/theme";
import { StyleSheet } from "react-native";
import { useThemeColors } from "../../hooks/use-theme-color";
import BasicInput, { BasicInputProps } from "./input";

const styles = StyleSheet.create({
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
    },
});

export type TextInputProps = BasicInputProps;

export default function TextInput(props: TextInputProps) {
    const themeColors = useThemeColors() as ThemeConfigType;
    return (
        <BasicInput

            {...props}
            style={[
                styles.input,
                {
                    borderColor: themeColors.text[200],
                    color: themeColors.text.default,
                },
                props.style,
            ]}
            placeholder={props.placeholder ?? "Escribe algo ..."}
            placeholderTextColor={themeColors.text[500]}
            autoCapitalize="none"
        />
    );
}
