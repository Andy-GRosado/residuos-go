import { IBoundingBox } from "@/src/models/bbox.model";
import { useCallback, useContext } from "react";

import { createContext } from "react";
import { TensorflowModel, TensorflowPlugin, useTensorflowModel } from "react-native-fast-tflite";
import { Frame, PhotoFile } from "react-native-vision-camera";
import { useResizePlugin } from 'vision-camera-resize-plugin';

interface YoloModelContextType {
    plugin: TensorflowPlugin,
    model: TensorflowModel | undefined,
    handlePredictDetectionFromFrame: (frame: Frame) => Promise<IBoundingBox[]>;
    handlePredictDetectionFromPhotoFile: (photFile: PhotoFile) => Promise<IBoundingBox[]>
}

const YoloModelContext = createContext<YoloModelContextType | null>(null);

export const CLASS_NAMES: Record<number, string> = {
    "0": 'bag',
    "1": 'bottle',
    "3": 'cardboard',
    "5": 'trash'
};

export function YoloModelProvider({ children }: { children: React.ReactNode }) {
    const plugin = useTensorflowModel(require('@/src/store/yolo/best_int8.tflite'))
    const model = plugin.state === 'loaded' ? plugin.model : undefined
    const { resize } = useResizePlugin()

    const handlePredictDetectionsFromFrame = useCallback(async (frame: Frame) => {
        const resized_image = resize(frame, {
            scale: {
                width: 640,
                height: 640,
            },
            pixelFormat: 'rgb',
            dataType: 'float32',
        })

        const normalizedData = new Float32Array(resized_image.length);
        for (let i = 0; i < resized_image.length; i++) {
            normalizedData[i] = resized_image[i] / 255.0;
        }
        console.log(normalizedData.length);

        if (!model) {
            return []
        }

        const outputs = model.runSync([normalizedData]);
        const yoloOutput: Float32Array = outputs[0] as Float32Array

        // PROCESAR DETECCIONES
        const newDetections: IBoundingBox[] = [];
        const scoreThreshold = 0.15;

        for (let i = 0; i < 300; i++) {
            const baseIndex = i * 6;
            const x1 = yoloOutput[baseIndex];
            const y1 = yoloOutput[baseIndex + 1];
            const x2 = yoloOutput[baseIndex + 2];
            const y2 = yoloOutput[baseIndex + 3];
            const confidence = yoloOutput[baseIndex + 4];
            const class_id = Math.round(yoloOutput[baseIndex + 5]);

            if (confidence > scoreThreshold) {
                newDetections.push({
                    x: Math.max(0, Math.min(1, x1)),
                    y: Math.max(0, Math.min(1, y1)),
                    width: Math.max(0, Math.min(1, x2 - x1)),
                    height: Math.max(0, Math.min(1, y2 - y1)),
                    score: confidence,
                    label: CLASS_NAMES[class_id] || `Class ${class_id}`
                });
            }
        }

        return newDetections;
    }, [model])

    const handlePredictDetectionsFromPhotoFile = useCallback(async (frame: PhotoFile) => {
        return []
    }, [model])

    return (
        <YoloModelContext.Provider
            value={{
                plugin: plugin,
                model: model,
                handlePredictDetectionFromFrame: handlePredictDetectionsFromFrame,
                handlePredictDetectionFromPhotoFile: handlePredictDetectionsFromPhotoFile
            }}
        >
            {children}
        </YoloModelContext.Provider>
    );
}


export function useYoloModel() {
    const context = useContext(YoloModelContext);

    if (context === null) {
        throw new Error("useY must be used within an LocationProvider");
    }

    return context;
}

