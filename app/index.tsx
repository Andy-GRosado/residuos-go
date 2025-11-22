import LogoImage from '@/src/shared/components/logo';
import ThemedText from '@/src/shared/components/themed-text';
import { ThemedTextBar } from '@/src/shared/components/themed-text-bar';
import { ThemedViewBar } from '@/src/shared/components/themed-view-bar';
import { useAuth } from '@/src/shared/hooks/use-auth';
import { useThemeColors } from '@/src/shared/hooks/use-theme-color';
import { ThemeConfigType } from '@/src/store/theme';
import { Redirect } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

export default function Index() {
  const { isAppReady, markAppAsReady } = useAuth();
  const themeColors = useThemeColors() as ThemeConfigType

  useEffect(() => {
    if (!isAppReady) {
      const timer = setTimeout(() => {
        markAppAsReady();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return (
      <ThemedViewBar
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: themeColors.bar.background.default,
        }}
      >
        <LogoImage size={200}/>
        <ThemedTextBar type="title">
          ResiduosGo
        </ThemedTextBar>
        <ThemedText 
          style={{
            paddingTop: 24,
            color: 'white',
            textAlign: 'center'
          }}
        >
          Bienvenido a reportar residuos
        </ThemedText>
        <ActivityIndicator 
          size="large" 
          color="white" 
          style={{ marginTop: 30 }} 
        />
      </ThemedViewBar>
    );
  }
  
  return <Redirect href="/login" />;
}
