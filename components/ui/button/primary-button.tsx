import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Pressable, PressableProps, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    button: {
        height: 50,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        color: "#ddd"
    },
});

export type PrimaryButtonProps = PressableProps & {
    onPressCallback: (...args: any[]) => any,
    active: boolean,
}

export default function PrimaryButton({children, onPressCallback, active}: PrimaryButtonProps) {
    const theme = useColorScheme() ?? "light";

    return (
        <Pressable
            style={{
                ...styles.button,
                backgroundColor: active
                    ? Colors[theme].bar_background
                    : Colors[theme].bar_background,
            }}
            onPress={onPressCallback}
        >
            {children}
        </Pressable>
    );
}
