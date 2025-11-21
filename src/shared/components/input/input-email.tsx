import { StyleSheet } from "react-native";
import BasicInput, { BasicInputProps } from "./input";

const styles = StyleSheet.create({
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
    },
});

export default function EmailTextInput(props: BasicInputProps) {
    return (
        <BasicInput
            {...props}
            placeholder={props.placeholder ?? 'Correo electrónico'}
            autoCapitalize="none"
            keyboardType="email-address"
        />
    );
}
