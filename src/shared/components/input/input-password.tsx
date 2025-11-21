import { ThemeConfigType } from "@/src/store/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { useThemeColors } from "../../hooks/use-theme-color";
import ThemedView from "../themed-view";
import BasicInput, { BasicInputProps } from "./input";

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

export type PasswordTextInputProps = BasicInputProps & {};

export default function PasswordTextInput(props: PasswordTextInputProps) {
    const [showPassword, setShowPassword] = useState(false);
    const themeColors = useThemeColors() as ThemeConfigType;

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <ThemedView style={styles.inputContainer}>
            <BasicInput
                {...props}
                placeholder={props.placeholder ?? 'Contraseña'}
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
