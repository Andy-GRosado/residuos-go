import { Colors } from "@/constants/theme";
import { StyleSheet, TextInputProps, useColorScheme } from "react-native";
import BasicTextInput from "./input";

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

export default function EmailTextInput(props: TextInputProps) {
    const theme = useColorScheme() ?? "light";
    return (
        <BasicTextInput
            style={{
                ...styles.input,
                borderColor: Colors[theme].text_200,
                color: Colors[theme].text,
            }}
            placeholder={props.placeholder ?? "Correo electrónico"}
            placeholderTextColor={Colors[theme].text_500}
            autoCapitalize="none"
            keyboardType="email-address"
            {...props}
        />
    );
}
