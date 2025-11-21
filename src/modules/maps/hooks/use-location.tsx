import { useContext } from "react";

// location-context.tsx
import * as Location from "expo-location";
import { createContext, useCallback, useEffect, useState } from "react";

interface LocationContextType {
    locationPermission: Location.LocationPermissionResponse | undefined;
    location: Location.LocationObject | undefined;
    askLocationPermission(): Promise<
        Location.LocationPermissionResponse | undefined
    >;
    updateLocation(): Promise<Location.LocationObject | undefined>;
    isWatching: boolean;
}

const LocationContext = createContext<LocationContextType | undefined>(
    undefined
);

export function LocationProvider({ children }: { children: React.ReactNode }) {
    const [locationPermission, setLocationPermission] = useState<
        Location.LocationPermissionResponse | undefined
    >(undefined);
    const [location, setLocation] = useState<
        Location.LocationObject | undefined
    >(undefined);
    const [isWatching, setIsWatching] = useState(false);

    const askLocationPermission = useCallback(async (): Promise<
        Location.LocationPermissionResponse | undefined
    > => {
        const location_permission =
            await Location.requestForegroundPermissionsAsync();
        setLocationPermission(location_permission);

        if (location_permission.status == "granted") {
            // Obtener ubicación inicial
            const currentLocation = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });
            setLocation(currentLocation);
        }

        return location_permission;
    }, []);

    const updateLocation = useCallback(async (): Promise<
        Location.LocationObject | undefined
    > => {
        const current_location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
        });

        setLocation(current_location);
        return current_location;
    }, []);

    // Configurar watchPositionAsync
    useEffect(() => {
        let subscription: Location.LocationSubscription | null = null;

        const startWatching = async () => {
            // Primero pedir permisos
            const { status } = await Location.requestForegroundPermissionsAsync();
            setLocationPermission(await Location.getForegroundPermissionsAsync());
            
            if (status === 'granted') {
                // Obtener ubicación inicial
                const initialLocation = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.Balanced,
                });
                setLocation(initialLocation);
                
                // Iniciar watching con intervalos optimizados
                subscription = await Location.watchPositionAsync(
                    {
                        accuracy: Location.Accuracy.Balanced,
                        timeInterval: 30000, // 30 segundos entre updates
                        distanceInterval: 50, // Solo actualizar si se movió 50 metros
                    },
                    (newLocation) => {
                        console.log('Nueva ubicación detectada');
                        setLocation(newLocation);
                    }
                );
                setIsWatching(true);
                console.log('Location watching started');
            }
        };

        startWatching();

        // Cleanup
        return () => {
            if (subscription) {
                subscription.remove();
                setIsWatching(false);
                console.log('Location watching stopped');
            }
        };
    }, []);

    return (
        <LocationContext.Provider
            value={{
                locationPermission: locationPermission,
                location: location,
                askLocationPermission: askLocationPermission,
                updateLocation: updateLocation,
                isWatching: isWatching,
            }}
        >
            {children}
        </LocationContext.Provider>
    );
}


export function useLocation() {
    const context = useContext(LocationContext);

    if(context === undefined) {
        throw new Error("useLocation must be used within an LocationProvider");
    }

    return context;
}

