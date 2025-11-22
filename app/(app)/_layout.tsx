import { useAuth } from '@/src/shared/hooks/use-auth';
import { useThemeColors } from '@/src/shared/hooks/use-theme-color';
import { ThemeConfigType } from '@/src/store/theme';
import { Redirect, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function AppLayout() {
  const themeColors = useThemeColors() as ThemeConfigType;
  const { getProfile } = useAuth();

  const [isProfileCreated, setIsProfileCreated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const profile = await getProfile();
        console.log('Profile check in layout:', profile);

        setIsProfileCreated(!!profile);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setIsProfileCreated(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Estado de carga
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: themeColors.background.default,
        }}
      >
        <ActivityIndicator
          size="large"
          color={themeColors.tint}
          style={{ marginTop: 30 }}
        />
      </View>
    );
  }

  // Si no tiene perfil creado, redirigir a new-profile
  if (isProfileCreated === false) {
    return <Redirect href="/(app)/new-profile" />;
  }

  // Si tiene perfil, mostrar las pantallas normales de la app
  return (
    <Stack>
      <Stack.Screen
        name="new-profile"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="map"
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
        name="report-history"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="report/[id]"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="report/create"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}