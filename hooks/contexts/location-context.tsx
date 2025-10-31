import * as Location from "expo-location";
import { createContext, useCallback, useEffect, useState } from "react";

interface LocationContextType {
    locationPermission: Location.LocationPermissionResponse | undefined;
    location: Location.LocationObject | undefined;
    askLocationPermission(): Promise<
        Location.LocationPermissionResponse | undefined
    >;
    updateLocation(): Promise<Location.LocationObject | undefined>;
}

export const LocationContext = createContext<LocationContextType | undefined>(
    undefined
);

export function LocationProvider({ children }: { children: React.ReactNode }) {
    const [locationPermission, setLocationPermission] = useState<
        Location.LocationPermissionResponse | undefined
    >(undefined);
    const [location, setLocation] = useState<
        Location.LocationObject | undefined
    >(undefined);

    const askLocationPermission = useCallback(async (): Promise<
        Location.LocationPermissionResponse | undefined
    > => {
        const location_permission =
            await Location.requestForegroundPermissionsAsync();
        setLocationPermission(location_permission);

        if (location_permission.status == "granted") {
            setLocation(
                await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.BestForNavigation,
                    timeInterval: 1500,
                })
            );
        }

        return location_permission;
    }, []);

    const updateLocation = useCallback(async (): Promise<
        Location.LocationObject | undefined
    > => {
        const current_location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
            timeInterval: 1500,
        });

        setLocation(current_location);
        return current_location;
    }, []);

    useEffect(() => {
        (async () => {
            await askLocationPermission();
        })();
    }, []);

    return (
        <LocationContext.Provider
            value={{
                locationPermission: locationPermission,
                location: location,
                askLocationPermission: askLocationPermission,
                updateLocation: updateLocation,
            }}
        >
            {children}
        </LocationContext.Provider>
    );
}
