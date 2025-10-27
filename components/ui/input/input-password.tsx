import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons"; // or your preferred icon library
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, useColorScheme } from "react-native";
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
        marginBottom: 15,
        fontSize: 16,
    },
    eyeIcon: {
        position: "absolute",
        right: 15,
        top: "50%",
        transform: [{ translateY: -24 }],
        padding: 5,
    },
});


export default function PasswordTextInput({initialPassword, handlePasswordChange}: {initialPassword: string, handlePasswordChange: (password: string) => void}) {
    const [showPassword, setShowPassword] = useState(false);
    const theme = useColorScheme() ?? 'light';

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <ThemedView
            style={styles.inputContainer}
        >
            <TextInput
                style={{...styles.input, borderColor: Colors[theme].text_200, color: Colors[theme].text}}
                placeholder="Contraseña"
                placeholderTextColor={Colors[theme].text_500}
                value={initialPassword}
                onChangeText={handlePasswordChange}
                secureTextEntry={!showPassword}
            />
            <TouchableOpacity
                style={styles.eyeIcon}
                onPress={toggleShowPassword}
            >
                <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={24}
                    color={Colors[theme].text_500}
                />
            </TouchableOpacity>
        </ThemedView>
    );
};

