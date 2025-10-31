import { View, type ViewProps } from "react-native";

import { ThemeConfigType } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-color";

export type ThemedViewProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
};

export default function ThemedView({
    style,
    lightColor,
    darkColor,
    ...otherProps
}: ThemedViewProps) {
    const themeColors = useThemeColors() as ThemeConfigType;

    return (
        <View
            style={[{ backgroundColor: themeColors.background.default }, style]}
            {...otherProps}
        />
    );
}
