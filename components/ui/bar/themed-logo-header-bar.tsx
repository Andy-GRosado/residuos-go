import { neutralColors, ThemeConfigType } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-color";
import ThemedText from "../themed-text";
import ThemedView from "../themed-view";

export default function ThemedLogoHeaderBar({title}: {title: string}) {
    const themeColors = useThemeColors() as ThemeConfigType;
    
    return (
        <ThemedView
            style={{
                paddingTop: 100,
                paddingBottom: 80,
                backgroundColor: themeColors.bar.background.default,
            }}
        >
            <ThemedText type="title" style={{ textAlign: "center", color: neutralColors[50] }}>
                {title}
            </ThemedText>
        </ThemedView>
    );
}
