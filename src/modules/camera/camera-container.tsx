import { IBoundingBox } from '@/src/models/bbox.model';
import ThemedText from '@/src/shared/components/themed-text';
import ThemedView from '@/src/shared/components/themed-view';
import { useThemeColors } from '@/src/shared/hooks/use-theme-color';
import { ThemeConfigType } from '@/src/store/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { useTensorflowModel } from 'react-native-fast-tflite';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
    Camera,
    PhotoFile,
    runAtTargetFps,
    useCameraDevice,
    useCameraFormat,
    useCameraPermission,
    useFrameProcessor
} from 'react-native-vision-camera';
import { Worklets } from 'react-native-worklets-core';
import { useResizePlugin } from 'vision-camera-resize-plugin';
import { BoundingBoxOverlay } from './components/bounding-box-overlay';
import { IconButtonWrapper } from './components/icon-button-wrapper';
import { NotCameraDeviceErrorPage } from './components/not-camera-device-error-page';
import { PermissionsPage } from './components/permissions-page';


const CLASS_NAMES: Record<number, string> = {
    "0": 'bag',
    "1": 'bottle',
    "3": 'cardboard',
    "5": 'trash'
};

export function CameraContainer() {
    const themeColors = useThemeColors() as ThemeConfigType;
    const { hasPermission: hasCameraPermission, requestPermission: requestCameraPermission } = useCameraPermission()
    const insets = useSafeAreaInsets();
    const device = useCameraDevice('back')
    const format = useCameraFormat(device, [
        { videoAspectRatio: 16 / 9 },
        { videoResolution: { width: 3048, height: 2160 } },
        { photoAspectRatio: 16 / 9 }
    ])
    const cameraRef = useRef<Camera>(null)
    const objectDetection = useTensorflowModel(require('@/src/store/yolo/best_int8.tflite'))
    const model = objectDetection.state === 'loaded' ? objectDetection.model : undefined

    const [detections, setDetections] = useState<IBoundingBox[]>([])
    const [photo, setPhoto] = useState<PhotoFile | null>(null);

    const handleTakePhoto = useCallback(async () => {
        if (cameraRef.current) {
            try {
                const photoResult = await cameraRef.current.takePhoto();
                console.log(photoResult.metadata);
                console.log(photoResult.)
                setPhoto(photoResult);
            } catch (error: any) {
                console.log(error.message);
            }
        }
    }, [])

    useEffect(() => {
        requestCameraPermission()
    }, [])

    const { resize } = useResizePlugin()

    const onChangeDetections = Worklets.createRunOnJS((detections: IBoundingBox[]) => {
        setDetections(detections);
    })

    const frameProcessor = useFrameProcessor(
        (frame) => {
            'worklet'

            if (model == null) {
                return;
            }

            runAtTargetFps(0.3, () => {
                'worklet'

                try {
                    console.log('🔄 Procesando frame...');
                    const resized_image = resize(frame, {
                        scale: {
                            width: 640,
                            height: 640,
                        },
                        pixelFormat: 'rgb',
                        dataType: 'float32',
                    })

                    const outputs = model.runSync([resized_image]);
                    const yoloOutput: Float32Array = outputs[0] as Float32Array

                    // PROCESAR DETECCIONES
                    const newDetections: IBoundingBox[] = [];
                    const scoreThreshold = 0.15;

                    for (let i = 0; i < 300; i++) {
                        const baseIndex = i * 6;

                        const y_center = yoloOutput[baseIndex];
                        const x_center = yoloOutput[baseIndex + 1];
                        const height = yoloOutput[baseIndex + 2];
                        const width = yoloOutput[baseIndex + 3];
                        const confidence = yoloOutput[baseIndex + 4];
                        const class_id = Math.round(yoloOutput[baseIndex + 5]);

                        if (confidence > scoreThreshold &&
                            x_center >= 0 && x_center <= 1 &&
                            y_center >= 0 && y_center <= 1) {

                            const x = x_center - width / 2;
                            const y = y_center - height / 2;

                            const clampedX = Math.max(0, Math.min(1, x));
                            const clampedY = Math.max(0, Math.min(1, y));
                            const clampedWidth = Math.max(0, Math.min(1, width));
                            const clampedHeight = Math.max(0, Math.min(1, height));

                            if (clampedWidth > 0.01 && clampedHeight > 0.01) {
                                newDetections.push({
                                    x: clampedX,
                                    y: clampedY,
                                    width: clampedWidth,
                                    height: clampedHeight,
                                    score: confidence,
                                    label: CLASS_NAMES[class_id] || `Class ${class_id}`
                                });
                            }
                        }
                    }

                    console.log(`🎯 Detecciones encontradas: ${newDetections.length}`);
                    onChangeDetections(newDetections);

                } catch (error: any) {
                    console.log('❌ Error en frame processor:', error.toString());
                }
            })
        },
        [model]
    )

    if (!hasCameraPermission) return <PermissionsPage />
    if (device == null) return <NotCameraDeviceErrorPage />

    if (photo) {
        return (
            <View>
                <ThemedText>Holi</ThemedText>
            </View>
            // <PhotoPreview
            //     photo={photo}
            //     onRetake={() => { setPhoto(null) }}
            // />
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
            <View style={[
                {
                    backgroundColor: themeColors.tint,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: 36,
                    paddingVertical: 24,
                }
            ]}>
                <View style={{ position: 'relative' }}>
                    <Ionicons name='bag' size={28} color={'white'}></Ionicons>
                    <ThemedText type='caption' style={{ position: 'absolute', top: -16, right: -16, width: 24, height: 24, borderRadius: 24, backgroundColor: 'red', textAlignVertical: 'center', textAlign: 'center' }}>
                        {0}
                    </ThemedText>
                </View>
                <View style={{ position: 'relative' }}>
                    <Ionicons name='flask' size={28} color={'white'}></Ionicons>
                    <ThemedText type='caption' style={{ position: 'absolute', top: -16, right: -16, width: 24, height: 24, borderRadius: 24, backgroundColor: 'red', textAlignVertical: 'center', textAlign: 'center' }}>
                        {0}
                    </ThemedText>
                </View>
                <View style={{ position: 'relative' }}>
                    <Ionicons name='cube' size={28} color={'white'}></Ionicons>
                    <ThemedText type='caption' style={{ position: 'absolute', top: -16, right: -16, width: 24, height: 24, borderRadius: 24, backgroundColor: 'red', textAlignVertical: 'center', textAlign: 'center' }}>
                        {0}
                    </ThemedText>
                </View>
                <View style={{ position: 'relative' }}>
                    <Ionicons name='trash' size={28} color={'white'}></Ionicons>
                    <ThemedText type='caption' style={{ position: 'absolute', top: -16, right: -16, width: 24, height: 24, borderRadius: 24, backgroundColor: 'red', textAlignVertical: 'center', textAlign: 'center' }}>
                        {0}
                    </ThemedText>
                </View>
            </View>

            {/* Contenedor de preview */}
            <View style={{
                flex: 1,
                position: 'relative',
            }}>
                <Camera
                    isActive
                    ref={cameraRef}
                    style={{
                        flex: 1,
                        width: '100%',
                    }}
                    device={device}
                    format={format}
                    resizeMode='contain'
                    photoQualityBalance='speed'
                    photo
                    frameProcessor={frameProcessor}
                    pixelFormat='yuv'

                    // enableBufferCompression
                    enableLocation
                />

                {/* Head gradient (optional) */}
                <LinearGradient
                    colors={[themeColors.tint, "transparent"]}
                    style={{ 
                        height: 30,
                        position: 'absolute',
                        top: 0,
                        width: '100%',
                    }}
                >
                </LinearGradient>

                {/* Bounding Box overlay - MISMO TAMAÑO QUE LA CÁMARA */}
                <BoundingBoxOverlay detections={detections} />
            </View>
            


            <LinearGradient
                colors={["transparent", "rgba(0, 0, 0, 0.7)", "rgba(20, 20, 20, 1)"]}
                style={[
                    {
                        flexDirection: 'row',
                        gap: 32,
                        position: 'absolute',
                        width: '100%',
                        bottom: 0,
                        marginBottom: 60,
                        justifyContent: 'center'
                    }
                ]}
            >
                <IconButtonWrapper size={60} handleClick={() => { handleTakePhoto() }}>
                    <Ionicons name='camera' size={32} color={'white'}></Ionicons>
                </IconButtonWrapper>
            </LinearGradient>
        </ThemedView>
    )
}
