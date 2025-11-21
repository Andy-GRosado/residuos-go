import { LocationProvider } from "@/src/modules/maps/hooks/use-location";
import { MapContainer } from "@/src/modules/maps/map-container";

export default function MapScreen() {
    return (
        <LocationProvider>
            <MapContainer></MapContainer>
        </LocationProvider>
    )
}
