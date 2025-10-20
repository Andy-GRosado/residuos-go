// components/app-router.tsx
import { useAuth } from '@/contexts/auth-context';
import { Redirect } from 'expo-router';

export default function AppRouter() {
  const { isAppReady, isAuthenticated } = useAuth();

  if (!isAppReady) {
    // Mostrar pantalla de logo
    return <Redirect href="/" />;
  }

  if (!isAuthenticated) {
    // Redirigir a login
    return <Redirect href="/(auth)/login" />;
  }

  // Usuario autenticado - redirigir a la app principal
  return <Redirect href="/(auth)/login" />;
}
