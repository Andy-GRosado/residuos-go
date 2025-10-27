import { useThemeColor } from "@/hooks/use-theme-color";
import ThemedText from "../themed-text";
import ThemedView from "../themed-view";

export default function ThemedLogoHeaderBar({title}: {title: string}) {
    const backgroundColor = useThemeColor({}, 'bar_background');
    const textColor = useThemeColor({}, 'bar_text');
    return (
        <ThemedView
            style={{
                paddingTop: 100,
                paddingBottom: 80,
                backgroundColor: backgroundColor,
            }}
        >
            <ThemedText type="title" style={{ textAlign: "center", color: textColor }}>
                {title}
            </ThemedText>
        </ThemedView>
    );
}
