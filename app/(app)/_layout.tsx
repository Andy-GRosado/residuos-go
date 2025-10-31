import { CameraProvider } from "@/hooks/contexts/camera-context";
import { LocationProvider } from "@/hooks/contexts/location-context";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function AppLayout() {
    const colorScheme = useColorScheme();

    return (
        <LocationProvider>
            <CameraProvider>
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
                    <Stack.Screen
                        name="camera"
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="report"
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="reports/[id]"
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="(welcome)"
                        options={{
                            headerShown: false,
                        }}
                    />
                </Stack>
            </CameraProvider>
        </LocationProvider>
    );
}
