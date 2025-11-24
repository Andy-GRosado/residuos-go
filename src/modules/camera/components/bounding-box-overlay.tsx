import { TensorBoundingBox } from '@/src/models/bbox.model';
import { ModelClass } from '@/src/store/yolo/labels';
import { useCallback, useEffect, useRef, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, Text, View } from 'react-native';
import { BoundingBoxTransformer, IContainerBoundingBox, IContainerDimensions } from '../utils/utils';

const CONF_CLASSES: Record<ModelClass, { color: string, icon: string }> = {
  'bag': { color: 'blue', icon: 'asdas' },
  'bottle': { color: 'orange', icon: 'asdas' },
  'cardboard': { color: 'brown', icon: 'asdas' },
  'trash': { color: 'pink', icon: 'asdas' },
};


export type BoundingBoxOverlayProps = {
  detections: TensorBoundingBox[]
  imageDimensions: IContainerDimensions,
}

export function BoundingBoxOverlay(props: BoundingBoxOverlayProps) {
  const containerRef = useRef<View>(null);
  const [boundingBoxTransformer, setBoundingBoxTransformer] = useState<
    ((norm_x1: number, norm_y1: number, norm_x2: number, norm_y2: number) => IContainerBoundingBox) | null
  >(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.measure((x, y, width, height) => {
        ;
      });
    }
  }, []);

  const updateDimensions = useCallback((event: LayoutChangeEvent) => {
    if (containerRef.current) {
      event.currentTarget.measure(((x, y, width, height) => {
        setBoundingBoxTransformer(() =>
          BoundingBoxTransformer({ width: props.imageDimensions.width, height: props.imageDimensions.height }, { width, height },)
        );
      }))
    }
  }, [])

  return (
    <View
      ref={containerRef}
      style={[StyleSheet.absoluteFill]}
      pointerEvents="none"
      onLayout={updateDimensions}
    >
      {boundingBoxTransformer != null && props.detections.length > 0 && props.detections.map((detection: TensorBoundingBox, index) => {
        const classConfig = CONF_CLASSES[detection.label];
        const borderColor = classConfig ? classConfig.color : '#00FF00';
        const backgroundColor = classConfig ? classConfig.color : 'rgba(0, 255, 0, 0.7)';

        const boundingBox = boundingBoxTransformer(detection.x1, detection.y1, detection.x2, detection.y2);

        return (
          <View
            key={`${detection.label}-${index}-${detection.x1}-${detection.y1}`}
            style={{
              position: 'absolute',
              left: boundingBox.x,
              top: boundingBox.y,
              width: boundingBox.width,
              height: boundingBox.height,
              borderWidth: 2,
              borderColor: borderColor,
              backgroundColor: 'transparent',
            }}
          >
            <View
              style={{
                position: 'absolute',
                left: 4,
                top: -20, // Increased to ensure it's above the box
                backgroundColor: backgroundColor,
                paddingHorizontal: 4,
                paddingVertical: 2,
                borderRadius: 4,
                minWidth: 80, // Ensure minimum width for better readability
              }}
            >
              <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                {detection.label} ({(detection.score * 100).toFixed(1)}%)
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}