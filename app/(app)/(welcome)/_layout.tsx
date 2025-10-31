import { Stack } from "expo-router";

export default function WelcomeLayout() {
    
    return (
        <Stack>
            <Stack.Screen
                name="profile"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
}
