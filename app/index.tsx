// app/index.tsx - VERSIÓN FINAL
import AppRouter from '@/components/app-router';
import { ThemedTextBar } from "@/components/ui/bar/themed-text-bar";
import { ThemedViewBar } from "@/components/ui/bar/themed-view-bar";
import LogoImage from "@/components/ui/logo";
import ThemedText from "@/components/ui/themed-text";
import { ThemeConfigType } from '@/constants/theme';
import { useAuth } from '@/hooks/use-auth';
import { useThemeColors } from "@/hooks/use-theme-color";
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
          type="default">
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
  
  return <AppRouter />;
}
