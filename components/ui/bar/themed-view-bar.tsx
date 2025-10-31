import { View, type ViewProps } from "react-native";

import { ThemeConfigType } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-color";

export type ThemedViewBarProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
};

export function ThemedViewBar({
    style,
    lightColor,
    darkColor,
    ...otherProps
}: ThemedViewBarProps) {
    const themeColors = useThemeColors() as ThemeConfigType;

    return (
        <View
            style={[
                { backgroundColor: themeColors.bar.background.default },
                style,
            ]}
            {...otherProps}
        />
    );
}
