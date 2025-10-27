import { useThemeColor } from "@/hooks/use-theme-color";
import ThemedText from "./themed-text";
import ThemedView from "./themed-view";

export default function ThemedLogoHeader({title}: {title: string}) {
    const backgroundColor = useThemeColor({}, 'background');
    const textColor = useThemeColor({}, 'text');
    
    return (
        <ThemedView
            style={{
                paddingTop: 80,
                paddingBottom: 60,
                backgroundColor: backgroundColor,
            }}
        >
            <ThemedText type="title" style={{ textAlign: "center", color: textColor }}>
                {title}
            </ThemedText>
        </ThemedView>
    );
}
