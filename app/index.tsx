// app/index.tsx - VERSIÓN FINAL
import { ThemedText } from "@/app-example/components/themed-text";
import { ThemedView } from "@/app-example/components/themed-view";
import AppRouter from '@/components/app-router';
import LogoImage from "@/components/ui/logo";
import { useAuth } from '@/contexts/auth-context';
import { useThemeColor } from "@/hooks/use-theme-color";
import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

export default function Index() {
  const { isAppReady, markAppAsReady } = useAuth();
  const backgroundColor = useThemeColor({}, 'bar_background')

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
      <ThemedView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: backgroundColor,
        }}
      >
        <LogoImage size={200}/>
        <ThemedText type="title">
          ResiduosGo
        </ThemedText>
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
      </ThemedView>
    );
  }

  // Si la app está lista, dejar que el router decida
  return <AppRouter />;
}
