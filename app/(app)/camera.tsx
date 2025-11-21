import { CameraContainer } from "@/src/modules/camera/camera-container";
import { LocationProvider } from "@/src/modules/maps/hooks/use-location";

export default function CameraScreen() {
    return (
        <LocationProvider>
            <CameraContainer />
        </LocationProvider>
    )
}
