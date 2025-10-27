// components/app-router.tsx
import { useAuth } from '@/hooks/use-auth';
import { Redirect } from 'expo-router';

export default function AppRouter() {
  const { isAppReady, isAuthenticated } = useAuth();

  if (!isAppReady) {
    return <Redirect href="/" />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  // Usuario autenticado - redirigir a la app principal
  return <Redirect href="/(app)/map" />;
}
