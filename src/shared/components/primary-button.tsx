import { ThemeConfigType } from "@/src/store/theme";
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native";
import { useThemeColors } from "../hooks/use-theme-color";

const styles = StyleSheet.create({
    button: {
        height: 50,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        paddingBlock: 10,
    },
});

export type PrimaryButtonProps = Omit<TouchableOpacityProps, 'style'> & {
    style?: ViewStyle;
}

export default function PrimaryButton(props: PrimaryButtonProps) {
    const themeColors = useThemeColors() as ThemeConfigType;

    return (
        <TouchableOpacity
            {...props}
            style={[
                styles.button,
                props.style,
                { backgroundColor: themeColors.tint },
            ]}
        >
            {props.children}
        </TouchableOpacity>
    );
}