import { ThemeConfigType } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-color";
import { Pressable, PressableProps, StyleSheet } from "react-native";

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

export type PrimaryButtonProps = PressableProps & {
    onPressCallback: (...args: any[]) => any,
}

export default function PrimaryButton({children, onPressCallback}: PrimaryButtonProps) {
    const themeColors = useThemeColors() as ThemeConfigType;

    return (
        <Pressable
            style={{
                ...styles.button,
                backgroundColor: themeColors.bar.background.default
            }}
            onPress={onPressCallback}
        >
            {children}
        </Pressable>
    );
}
