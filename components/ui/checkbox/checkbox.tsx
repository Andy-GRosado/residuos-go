// /components/ui/checkbox/checkbox.tsx
import Checkbox, { CheckboxProps } from "expo-checkbox";
import { StyleSheet, View } from "react-native";
import ThemedText from "../themed-text";

export type ThemedCheckboxProps = CheckboxProps & { label: string };

export default function ThemedCheckbox({ label, value, onValueChange, ...props }: ThemedCheckboxProps) {
    return (
        <View style={styles.checkboxItem}>
            <Checkbox
                value={value}
                onValueChange={onValueChange}
                {...props}
            />
            <ThemedText style={styles.checkboxLabel}>{label}</ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    checkboxItem: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 6,
    },
    checkboxLabel: { marginLeft: 8, fontSize: 15 },
});
