import { ThemeConfigType } from "@/src/store/theme";
import { TextInput, TextInputProps } from "react-native";
import { useThemeColors } from "../../hooks/use-theme-color";


export type BasicInputProps = TextInputProps & {
    state?: 'default' | 'error' | 'info' | 'warning' | 'success';
};

export default function BasicInput(props: BasicInputProps) {
    const themeColors = useThemeColors() as ThemeConfigType;
    return (
        <TextInput
            {...props}
            style={
                [
                    { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12, borderWidth: 2, borderColor: themeColors.text.default, color: themeColors.text.default },
                    props.style
                ]
            }
            placeholderTextColor={themeColors.text[500]}
        />
    );
}
