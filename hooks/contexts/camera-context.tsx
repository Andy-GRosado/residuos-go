import { CameraCapturedPicture } from "expo-camera";
import * as Camera from "expo-image-picker";
import { createContext, useCallback, useEffect, useState } from "react";

interface CameraContextType {
    photo: CameraCapturedPicture | undefined;
    setPhoto: (...args: any[]) => any;
    cameraPermission: Camera.CameraPermissionResponse | undefined;
    askCameraPermission(): Promise<Camera.CameraPermissionResponse | undefined>;
}

export const CameraContext = createContext<CameraContextType | undefined>(
    undefined
);

export function CameraProvider({ children }: { children: React.ReactNode }) {
    const [photo, setPhoto] = useState<CameraCapturedPicture | undefined>(
        undefined
    );
    const [cameraPermission, setCameraPermission] = useState<
        Camera.CameraPermissionResponse | undefined
    >(undefined);

    const askCameraPermission = useCallback(async () => {
        if (!cameraPermission) {
            const permission = await Camera.requestCameraPermissionsAsync();
            setCameraPermission(permission);
            return permission;
        }
        return cameraPermission;
    }, []);

    useEffect(() => {
        (async () => {
            await askCameraPermission();
        })();
    }, []);

    return (
        <CameraContext.Provider
            value={{
                photo,
                setPhoto,
                cameraPermission: cameraPermission,
                askCameraPermission: askCameraPermission,
            }}
        >
            {children}
        </CameraContext.Provider>
    );
}
