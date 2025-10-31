import TextInput from "@/components/ui/input/input-text";
import ThemedLogoHeader from "@/components/ui/themed-logo-header";
import ThemedText from "@/components/ui/themed-text";
import ThemedView from "@/components/ui/themed-view";
import { ThemeConfigType } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-color";
import { IShortProfile } from "@/models/profile.model";
import { useState } from "react";
import { View } from "react-native";

export default function CreateProfileScreen() {
    const themeColors = useThemeColors() as ThemeConfigType;

    const [formData, setFormData] = useState<
        Omit<IShortProfile, "id" | "created_by" | "created_at">
    >({
        names: "",
        last_names: "",
        username: "",
        gender: "",
        photo_url: "",
        phone_number: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleInputChange =  async (field: keyof Omit<IShortProfile, "id" | "created_by" | "created_at">, value: string) => {
        
    }

    return (
        <ThemedView>
            <ThemedLogoHeader title="Bienvenido, gracias por ser parte de esta iniciativa!"></ThemedLogoHeader>
            <View>
                <View>
                    <ThemedText>
                        Todo reporte de acumulación de residuos contribuye a
                        reducir su presencia
                    </ThemedText>
                </View>

                {/* Name */}
                <TextInput
                    style={[
                        errors.name && { borderColor: "#e74c3c" },
                    ]}
                    placeholder="Nombres"
                    placeholderTextColor="#999"
                    value={formData.names}
                    onChangeText={(value) => handleInputChange("names", value)}
                    autoCapitalize="words"
                />
                {errors.names && (
                    <ThemedText style={[errors.name && { borderColor: themeColors.semantic.error.default }]}>
                        {errors.names}
                    </ThemedText>
                )}

                {/* Names */}
                <TextInput
                    style={[
                        errors.name && { borderColor: "#e74c3c" },
                    ]}
                    placeholder="Nombres"
                    placeholderTextColor="#999"
                    value={formData.names}
                    onChangeText={(value) => handleInputChange("names", value)}
                    autoCapitalize="words"
                />
                {errors.names && (
                    <ThemedText style={[errors.name && { borderColor: themeColors.semantic.error.default }]}>
                        {errors.names}
                    </ThemedText>
                )}


                {/* Last Names */}
                <TextInput
                    style={[
                        errors.last_names && { borderColor: "#e74c3c" },
                    ]}
                    placeholder="Nombres"
                    placeholderTextColor="#999"
                    value={formData.last_names}
                    onChangeText={(value) => handleInputChange("last_names", value)}
                    autoCapitalize="words"
                />
                {errors.last_names && (
                    <ThemedText style={[errors.last_names && { borderColor: themeColors.semantic.error.default }]}>
                        {errors.last_names}
                    </ThemedText>
                )}


                {/* Username */}
                <TextInput
                    style={[
                        errors.username && { borderColor: "#e74c3c" },
                    ]}
                    placeholder="Nombres"
                    placeholderTextColor="#999"
                    value={formData.username}
                    onChangeText={(value) => handleInputChange("username", value)}
                    autoCapitalize="words"
                />
                {errors.username && (
                    <ThemedText style={[errors.username && { borderColor: themeColors.semantic.error.default }]}>
                        {errors.username}
                    </ThemedText>
                )}


                {/* Gender */}
                <TextInput
                    style={[
                        errors.gender && { borderColor: "#e74c3c" },
                    ]}
                    placeholder="Nombres"
                    placeholderTextColor="#999"
                    value={formData.gender}
                    onChangeText={(value) => handleInputChange("gender", value)}
                    autoCapitalize="words"
                />
                {errors.gender && (
                    <ThemedText style={[errors.gender && { borderColor: themeColors.semantic.error.default }]}>
                        {errors.gender}
                    </ThemedText>
                )}

                {/* Gender */}
                <TextInput
                    style={[
                        errors.gender && { borderColor: "#e74c3c" },
                    ]}
                    placeholder="Nombres"
                    placeholderTextColor="#999"
                    value={formData.gender}
                    onChangeText={(value) => handleInputChange("gender", value)}
                    autoCapitalize="words"
                />
                {errors.gender && (
                    <ThemedText style={[errors.gender && { borderColor: themeColors.semantic.error.default }]}>
                        {errors.gender}
                    </ThemedText>
                )}


                {/* Gender */}
                <TextInput
                    style={[
                        errors.gender && { borderColor: "#e74c3c" },
                    ]}
                    placeholder="Nombres"
                    placeholderTextColor="#999"
                    value={formData.gender}
                    onChangeText={(value) => handleInputChange("gender", value)}
                    autoCapitalize="words"
                />
                {errors.gender && (
                    <ThemedText style={[errors.gender && { borderColor: themeColors.semantic.error.default }]}>
                        {errors.gender}
                    </ThemedText>
                )}
            </View>
        </ThemedView>
    );
}
