import { ThemeConfigType } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons"; // or your preferred icon library
import React, { useState } from "react";
import {
    StyleSheet,
    TextInput,
    TextInputProps,
    TouchableOpacity,
} from "react-native";
import ThemedView from "../themed-view";

const styles = StyleSheet.create({
    inputContainer: {
        position: "relative",
        width: "100%",
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    eyeIcon: {
        position: "absolute",
        right: 15,
        top: "50%",
        transform: [{ translateY: -20 }],
        padding: 8
    },
});

export type PasswordTextInputProps = TextInputProps & {
    initialPassword?: string;
    handlePasswordChange: (password: string) => void;
};

export default function PasswordTextInput(props: PasswordTextInputProps) {
    const [showPassword, setShowPassword] = useState(false);
    const themeColors = useThemeColors() as ThemeConfigType;

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <ThemedView style={styles.inputContainer}>
            <TextInput
                style={[
                    props.style,
                    {
                        ...styles.input,
                        borderColor: themeColors.text[200],
                        color: themeColors.text.default,
                    },
                ]}
                placeholder={props.placeholder ?? 'Contraseña'}
                placeholderTextColor={themeColors.text[500]}
                value={props.initialPassword}
                onChangeText={props.handlePasswordChange}
                secureTextEntry={!showPassword}
            />
            <TouchableOpacity
                style={styles.eyeIcon}
                onPress={toggleShowPassword}
            >
                <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={24}
                    color={themeColors.text[500]}
                />
            </TouchableOpacity>
        </ThemedView>
    );
}
