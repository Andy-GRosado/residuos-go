import { IBoundingBox } from "@/src/models/bbox.model";
import ThemedText from "@/src/shared/components/themed-text";
import ThemedView from "@/src/shared/components/themed-view";
import { useThemeColors } from "@/src/shared/hooks/use-theme-color";
import { ThemeConfigType } from "@/src/store/theme";

import { Ionicons } from "@expo/vector-icons";
import { useCallback, useRef, useState } from "react";
import { View } from "react-native";
import { Camera, Frame, runAtTargetFps, useCameraDevice, useCameraFormat, useFrameProcessor } from "react-native-vision-camera";
import { Worklets } from "react-native-worklets-core";
import { useResizePlugin } from "vision-camera-resize-plugin";
import { CLASS_NAMES, useYoloModel } from "../../hooks/useYoloModel";
import { BoundingBoxOverlay } from "../bounding-box-overlay";
import { IconButtonWrapper } from "../icon-button-wrapper";

export type CameraPreviewPageProps = {
    eventTakePhoto: (photoUri: string, boundingBox: IBoundingBox[]) => any
}


export function CameraPreviewPage(props: CameraPreviewPageProps) {
    const themeColors = useThemeColors() as ThemeConfigType;
    const device = useCameraDevice('back')
    const format = useCameraFormat(device, [
        { videoAspectRatio: 1 / 1 },
        { photoAspectRatio: 1 / 1 }
    ])

    const { model, handlePredictDetectionFromFrame } = useYoloModel();
    const { resize } = useResizePlugin()

    const cameraRef = useRef<Camera>(null)
    const [lastFrame, setLastFrame] = useState<Frame>();
    const [detections, setDetections] = useState<IBoundingBox[]>([])

    if (!device) {
        return (
            <ThemedView>
                <ThemedText style={{ marginVertical: 40 }}>No se encontró la cámara</ThemedText>
            </ThemedView>
        )
    }

    const handleTakePhoto = useCallback(async () => {
        // By now is sending the photo uri of photo taken with camera
        if (cameraRef) {
            const photo = await cameraRef.current?.takePhoto();
            if (photo) {
                props.eventTakePhoto(`file://${photo.path}`, [])
            }
        }
    }, [lastFrame])

    const handleUpdateLastFrame = Worklets.createRunOnJS((lastFrame: Frame) => {
        setLastFrame(lastFrame);
    })

    const handleUpdateDetections = Worklets.createRunOnJS((detections: IBoundingBox[]) => {
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
                handleUpdateLastFrame(frame);

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
                } catch (error: any) {
                    console.log('❌ Error en frame processor:', error.toString());
                }
            })
        },
        [model]
    )

    return (
        <ThemedView style={{ flex: 1, flexDirection: 'column',  gap: 4}}>
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
                <IconButtonWrapper size={60} handleClick={() => { handleTakePhoto() }}>
                    <Ionicons name='camera' size={32} color={'white'}></Ionicons>
                </IconButtonWrapper>
            </ThemedView>
        </ThemedView>
    )
}
