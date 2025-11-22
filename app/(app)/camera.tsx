import { CameraContainer } from "@/src/modules/camera/camera-container";
import { YoloModelProvider } from "@/src/modules/camera/hooks/useYoloModel";
import { LocationProvider } from "@/src/modules/maps/hooks/use-location";

export default function CameraScreen() {
    return (
        <LocationProvider>
            <YoloModelProvider>
                <CameraContainer />
            </YoloModelProvider>
        </LocationProvider>
    )
}
