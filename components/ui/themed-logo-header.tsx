import { useThemeColor } from "@/hooks/use-theme-color";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

export default function ThemedLogoHeader({title}: {title: string}) {
    const backgroundColor = useThemeColor({}, 'bar_background');
    return (
        <ThemedView
            style={{
                paddingTop: 80,
                paddingBottom: 60,
                backgroundColor: backgroundColor,
            }}
        >
            <ThemedText type="title" style={{ textAlign: "center" }}>
                {title}
            </ThemedText>
        </ThemedView>
    );
}
