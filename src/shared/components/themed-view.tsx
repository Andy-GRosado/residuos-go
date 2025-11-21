import { ThemeConfigType } from "@/src/store/theme";
import { View, type ViewProps } from "react-native";
import { useThemeColors } from "../hooks/use-theme-color";

export type ThemedViewProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
};

export default function ThemedView({
    style,
    lightColor,
    darkColor,
    children,
    ...otherProps
}: ThemedViewProps) {
    const themeColors = useThemeColors() as ThemeConfigType;

    return (
        <View
            {...otherProps}
            style={[{ backgroundColor: themeColors.background.default }, style]}
        >
            {children}
        </View>
    );
}
