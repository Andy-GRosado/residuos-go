import { TensorBoundingBox } from '@/src/models/bbox.model';
import { ThemedTextBar } from '@/src/shared/components/themed-text-bar';
import ThemedView from '@/src/shared/components/themed-view';
import { ThemedViewBar } from '@/src/shared/components/themed-view-bar';
import { useModal } from '@/src/shared/hooks/use-modal';
import { useThemeColors } from '@/src/shared/hooks/use-theme-color';
import { ThemeConfigType } from '@/src/store/theme';
import * as Location from "expo-location";
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
    useCameraPermission
} from 'react-native-vision-camera';
import { CameraPreviewPage } from './components/screens/camera-preview-page';
import { PermissionsPage } from './components/screens/permissions-page';
import { PhotoPreview } from './components/screens/photo-preview';


export function CameraContainer() {
    const themeColors = useThemeColors() as ThemeConfigType;
    const { hasPermission: hasCameraPermission, requestPermission: requestCameraPermission } = useCameraPermission()
    const insets = useSafeAreaInsets();
    const { showModal } = useModal()

    const [photo, setPhoto] = useState<string | null>(null);
    const [detections, setDetections] = useState<TensorBoundingBox[]>([]);
    const [lastLocation, setLastLocation] = useState<Location.LocationObjectCoords | null>(null);

    const handleTakePhoto = useCallback(async (photoUri: string, boundingBox: TensorBoundingBox[]) => {
        const location = await Location.getCurrentPositionAsync();
        // if (!turf.booleanPointInPolygon([location.coords.latitude, location.coords.longitude], VillaElSalvadorPolygon)) {
        //     showModal({ title: 'Ubicación fuera de rango', message: 'No puedes crear reportes fuera de Villa el Salvador', type: 'error' });
        //     return;
        // }

        setLastLocation(location.coords);
        setPhoto(photoUri);
        setDetections(boundingBox);
    }, [setPhoto, setDetections, setLastLocation])

    useEffect(() => {
        (async () => {
            requestCameraPermission();
        })();
    }, [])
    if (!hasCameraPermission) return <PermissionsPage />

    if (photo && lastLocation) {
        return (

            <PhotoPreview
                photoUri={photo}
                boundingBox={detections}
                location={lastLocation}
                onRetake={() => { setPhoto(null) }}
            />
        );
    }

    return (
        <ThemedView
            style={[
                { flex: 1, position: 'relative' },
                { marginTop: insets.top, marginBottom: insets.bottom, marginRight: insets.right, marginLeft: insets.left }
            ]}
        >
            {/* Status bar with objects counter detections */}
            <ThemedViewBar style={{ flexDirection: 'row', gap: 24, height: 64, alignItems: 'center', justifyContent: 'center' }}>
                <ThemedTextBar type='subtitle'>Buscando residuos</ThemedTextBar>
                <ActivityIndicator></ActivityIndicator>
            </ThemedViewBar>

            {/* Contenedor de preview */}
            <CameraPreviewPage eventTakePhoto={handleTakePhoto}></CameraPreviewPage>
        </ThemedView>
    )
}
