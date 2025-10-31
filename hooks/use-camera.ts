import { useContext } from "react";
import { CameraContext } from "./contexts/camera-context";


export function useCamera() {
    const context = useContext(CameraContext);

    if (context === undefined) {
        throw new Error("useCamera must be used within CameraProvider");
    }

    return context;
}

