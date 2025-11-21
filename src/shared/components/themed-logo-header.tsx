import { ThemeConfigType } from "@/src/store/theme";
import { useThemeColors } from "../hooks/use-theme-color";
import ThemedText from "./themed-text";
import ThemedView from "./themed-view";

export function ThemedLogoHeader({title}: {title: string}) {
    const themeColors = useThemeColors() as ThemeConfigType;
    
    return (
        <ThemedView
            style={{
                paddingTop: 80,
                paddingBottom: 60,
                backgroundColor: themeColors.background.default,
            }}
        >
            <ThemedText type="title" style={{ textAlign: "center", color: themeColors.text.default }}>
                {title}
            </ThemedText>
        </ThemedView>
    );
}
