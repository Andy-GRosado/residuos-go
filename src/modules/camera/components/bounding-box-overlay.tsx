import { IBoundingBox } from '@/src/models/bbox.model';
import { ModelClass } from '@/src/store/yolo/labels';
import { StyleSheet, Text, View } from 'react-native';

const CONF_CLASSES: Record<ModelClass, { color: string, icon: string }> = {
  'bag': { color: 'blue', icon: 'asdas' },
  'bottle': { color: 'orange', icon: 'asdas' },
  'cardboard': { color: 'brown', icon: 'asdas' },
  'trash': { color: 'pink', icon: 'asdas' },
};

export function BoundingBoxOverlay({ detections }: { detections: IBoundingBox[] }) {
  console.log(detections);
  return (
    <View style={[StyleSheet.absoluteFill, { borderWidth: 2, borderColor: 'white' }]} pointerEvents="none">
      {detections.map((detection, index) => (
        <View
          key={index}
          style={{
            position: 'absolute',
            left: `${detection.x * 100 + 1}%`,
            top: `${detection.y * 100 + 16}%`,
            width: `${detection.width * 100 - 1}%`,
            height: `${detection.height * 100 - 16}%`,
            borderWidth: 2,
            borderColor: CONF_CLASSES[detection.label] ? CONF_CLASSES[detection.label].color : '#00FF00',
            backgroundColor: 'transparent',
          }}
        >
          <View
            style={{
              position: 'absolute',
              top: -20,
              backgroundColor: CONF_CLASSES[detection.label] ? CONF_CLASSES[detection.label].color : 'rgba(0, 255, 0, 0.7)',
              paddingHorizontal: 4,
              paddingVertical: 2,
              borderRadius: 4,
            }}
          >
            <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
              {detection.label} ({(detection.score * 100).toFixed(1)}%)
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}
