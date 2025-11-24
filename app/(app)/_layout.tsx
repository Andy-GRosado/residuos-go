import { Stack } from 'expo-router';

export default function AppLayout() {
  // const themeColors = useThemeColors() as ThemeConfigType;
  // const { getProfile } = useAuth();

  // const [isProfileCreated, setIsProfileCreated] = useState<boolean>(false);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       setIsLoading(true);
  //       const profile = await getProfile();
  //       console.log('Profile check in layout:', profile);
  //       // setIsProfileCreated(profile != undefined);
  //       if (profile == undefined) {
  //         router.push('/(app)/new-profile');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching profile:', error);
  //       // setIsProfileCreated(false);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchProfile();
  // }, []);

  // Estado de carga
  // if (isLoading) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         justifyContent: "center",
  //         alignItems: "center",
  //         backgroundColor: themeColors.background.default,
  //       }}
  //     >
  //       <ActivityIndicator
  //         size="large"
  //         color={themeColors.tint}
  //         style={{ marginTop: 30 }}
  //       />
  //     </View>
  //   );
  // }

  // Si no tiene perfil creado, redirigir a new-profile
  // if (!isProfileCreated) {
  //   return <Redirect href="/(app)/new-profile" />;
  // }

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