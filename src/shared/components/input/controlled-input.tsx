// components/ui/input/controlled-input.tsx
import { ThemeConfigType } from "@/src/store/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { View } from "react-native";
import { useThemeColors } from "../../hooks/use-theme-color";
import ThemedText from "../themed-text";
import { BasicInputProps } from "./input";

// Extiende FieldValues para ser más flexible
interface ControlledInputProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    children: React.ReactElement<BasicInputProps>;
    placeholder?: string;
}

export function ControlledInput<T extends FieldValues>({
    name,
    control,
    children,
    placeholder,
}: ControlledInputProps<T>) {
    const themeColors = useThemeColors() as ThemeConfigType;

    const {
        field: { onChange, onBlur, value },
        fieldState: { error, isTouched },
    } = useController({
        name,
        control,
    });

    const inputWithProps = React.cloneElement(children, {
        ...children.props,
        onChangeText: onChange,
        onBlur: onBlur,
        value: value ?? '', // Manejo seguro de null/undefined
        placeholder: children.props.placeholder ?? placeholder,
    });

    return (
        <View>
            {inputWithProps}
            {error && (
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 4,
                    paddingHorizontal: 4,
                    marginTop: 4
                }}>
                    <Ionicons
                        name="alert-circle"
                        size={16}
                        color={themeColors.semantic.error.default}
                    />
                    <ThemedText
                        style={{
                            color: themeColors.semantic.error.default,
                            fontSize: 14
                        }}
                    >
                        {error.message}
                    </ThemedText>
                </View>
            )}
        </View>
    );
}