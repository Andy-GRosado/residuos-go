import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function AppLayout() {
    const colorScheme = useColorScheme();

    return (
        <Stack>
            <Stack.Screen
                name="map"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="history"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
}
