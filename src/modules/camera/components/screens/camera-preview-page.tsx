import { IBoundingBox } from "@/src/models/bbox.model";
import ThemedText from "@/src/shared/components/themed-text";
import ThemedView from "@/src/shared/components/themed-view";

import { Ionicons } from "@expo/vector-icons";
import { useCallback, useRef, useState } from "react";
import { View } from "react-native";
import { Camera, runAtTargetFps, useCameraDevice, useCameraFormat, useFrameProcessor, VisionCameraProxy } from "react-native-vision-camera";
import { Worklets } from "react-native-worklets-core";
import { CLASS_NAMES, useYoloModel } from "../../hooks/useYoloModel";
import { BoundingBoxOverlay } from "../bounding-box-overlay";
import { IconButtonWrapper } from "../icon-button-wrapper";

export type CameraPreviewPageProps = {
    eventTakePhoto: (photoUri: string, boundingBox: IBoundingBox[]) => any
}


export function CameraPreviewPage(props: CameraPreviewPageProps) {
    const device = useCameraDevice('back')
    const format = useCameraFormat(device, [
        { videoAspectRatio: 1 / 1 },
        { photoAspectRatio: 1 / 1 }
    ])

    const { model } = useYoloModel();

    const cameraRef = useRef<Camera>(null)
    const [detections, setDetections] = useState<IBoundingBox[]>([])
    const [enabledTakePhotoButton, setEnabledTakePhotoButton] = useState<boolean>(false);
    const resizer = VisionCameraProxy.initFrameProcessorPlugin('resize', {
        scale: {
            width: 640,
            height: 640,
        },
        pixelFormat: 'rgb',
        dataType: 'float32',
    })

    if (!device) {
        return (
            <ThemedView>
                <ThemedText style={{ marginVertical: 40 }}>No se encontró la cámara</ThemedText>
            </ThemedView>
        )
    }

    const handleTakePhoto = useCallback(async () => {
        // By now is sending the photo uri of photo taken with camera¿
        if (cameraRef.current && enabledTakePhotoButton) {
            if (detections.length === 0) {
                return;
            }

            const photo = await cameraRef.current.takePhoto();
            if (!photo) {
                return;
            }
            
            props.eventTakePhoto(`file://${photo.path}`, detections)
        }
    }, [cameraRef, enabledTakePhotoButton, detections])

    const handleUpdateDetections = Worklets.createRunOnJS((detections: IBoundingBox[]) => {
        setDetections(detections);
    })

    const handleEnableTakePhotoButton = Worklets.createRunOnJS((enable: boolean) => {
        setEnabledTakePhotoButton(enable);
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

                    if (!resizer) {
                        return;
                    }

                    const resized_image = new Float32Array(resizer.call(frame, {
                        scale: {
                            width: 640,
                            height: 640,
                        },
                        pixelFormat: 'rgb',
                        dataType: 'float32',
                    }) as ArrayBuffer);

                    const outputs = model.runSync([resized_image]);
                    const yoloOutput: Float32Array = outputs[0] as Float32Array

                    // PROCESAR DETECCIONES
                    const newDetections: IBoundingBox[] = [];
                    const scoreThreshold = 0.2;

                    for (let i = 0; i < 300; i++) {
                        const baseIndex = i * 6;
                        const confidence = yoloOutput[baseIndex + 4];

                        if (confidence < scoreThreshold) {
                            continue;
                        }

                        const x1 = yoloOutput[baseIndex];
                        const y1 = yoloOutput[baseIndex + 1];
                        const x2 = yoloOutput[baseIndex + 2];
                        const y2 = yoloOutput[baseIndex + 3];
                        const class_id = Math.round(yoloOutput[baseIndex + 5]);

                        newDetections.push({
                            x: Math.max(0, Math.min(1, x1)),
                            y: Math.max(0, Math.min(1, y1)),
                            width: Math.max(0, Math.min(1, x2 - x1)),
                            height: Math.max(0, Math.min(1, y2 - y1)),
                            score: confidence,
                            label: CLASS_NAMES[class_id] || `Class ${class_id}`
                        });
                    }

                    console.log(`🎯 Detecciones encontradas: ${newDetections.length}`);
                    handleUpdateDetections(newDetections);
                    handleEnableTakePhotoButton(newDetections.length > 0);
                } catch (error: any) {
                    console.log('❌ Error en frame processor:', error.toString());
                }
            })
        },
        [model]
    )

    return (
        <ThemedView style={{ flex: 1, flexDirection: 'column', gap: 4 }}>
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

                {/* Bounding Box overlay - MISMO TAMAÑO QUE LA CÁMARA */}
                <BoundingBoxOverlay detections={detections} />
            </View>

            <ThemedView
                style={[
                    {
                        flexDirection: 'row',
                        gap: 32,
                        width: '100%',
                        paddingVertical: 24,
                        justifyContent: 'center'
                    }
                ]}
            >
                <IconButtonWrapper
                    size={60}
                    handleClick={() => { handleTakePhoto() }}
                >
                    <Ionicons name='camera' size={32} color={enabledTakePhotoButton ? 'white' : 'gray'}></Ionicons>
                </IconButtonWrapper>
            </ThemedView>
        </ThemedView>
    )
}
