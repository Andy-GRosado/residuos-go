import ThemedText from '@/components/ui/themed-text';
import ThemedView from '@/components/ui/themed-view';
import { Ionicons } from '@expo/vector-icons';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Button,
    Dimensions,
    Image,
    Platform,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const cameraRef = useRef<any>(null);
  const router = useRouter();
  const params = useLocalSearchParams();

  // Configuración de calidad de cámara
  const cameraSettings = {
    quality: 1, // 0 a 1 - 1 es máxima calidad
    zoom: 0, // Zoom inicial
    enableZoom: true, // Habilitar zoom
    enableExif: true, // Incluir metadatos EXIF
  };

  useEffect(() => {
    // Preparar la cámara con mejor configuración
    return () => {
      // Cleanup
      if (photo) {
        FileSystem.deleteAsync(photo).catch(console.error);
      }
    };
  }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.message}>
          Necesitamos tu permiso para usar la cámara
        </ThemedText>
        <Button onPress={requestPermission} title="Conceder permiso" />
      </ThemedView>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current && cameraReady) {
      try {
        setIsProcessing(true);
        
        const photoConfig = {
          quality: 1, // Máxima calidad
          base64: false, // No base64 para mejor performance
          exif: true, // Incluir metadatos
          skipProcessing: false, // Procesamiento nativo
          // Configuraciones específicas por plataforma
          ...(Platform.OS === 'ios' && {
            videoQuality: 'high', // Alta calidad en iOS
          }),
          ...(Platform.OS === 'android' && {
            pictureSize: 'high', // Tamaño alto en Android
          }),
        };

        const photoResult = await cameraRef.current.takePictureAsync(photoConfig);
        
        if (photoResult.uri) {
          // Opcional: Procesar la imagen para mejor calidad
          const processedImage = await manipulateAsync(
            photoResult.uri,
            [
              // { rotate: 0 }, // Rotar si es necesario
              // { flip: { horizontal: false } }, // Voltear si es necesario
            ],
            { 
              compress: 0.9, // Compresión mínima
              format: SaveFormat.JPEG,
              base64: false
            }
          );
          
          setPhoto(processedImage.uri);
        }
      } catch (error) {
        console.error('Error tomando foto:', error);
        Alert.alert('Error', 'No se pudo tomar la foto. Intenta de nuevo.');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const retakePicture = () => {
    setPhoto(null);
    setIsProcessing(false);
  };

  const usePicture = () => {
    if (photo) {
      router.push({
        pathname: '/(app)/map',
        params: {
          photoUri: photo,
          location: params.location || null,
        }
      });
    }
  };

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  if (photo) {
    return (
      <ThemedView style={styles.container}>
        <Image 
          source={{ uri: photo }} 
          style={styles.preview} 
          resizeMode="contain"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={retakePicture}
            disabled={isProcessing}
          >
            <Ionicons name="refresh" size={24} color="white" />
            <ThemedText style={styles.buttonText}>Volver a tomar</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.primaryButton]} 
            onPress={usePicture}
            disabled={isProcessing}
          >
            <Ionicons name="checkmark" size={24} color="white" />
            <ThemedText style={styles.buttonText}>
              {isProcessing ? 'Procesando...' : 'Usar foto'}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <CameraView 
        style={styles.camera} 
        facing={facing}
        ref={cameraRef}
        mode="picture" // Modo foto (no video)
        zoom={cameraSettings.zoom}
        // enableZoom={cameraSettings.enableZoom}
        onCameraReady={() => setCameraReady(true)}
        // Configuraciones adicionales de calidad
        pictureSize="max" // Tamaño máximo de imagen
      >
        <View style={styles.overlay}>
          {/* Marco de guía para mejor composición */}
          <View style={styles.guideFrame} />
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={toggleCameraFacing}
            disabled={isProcessing}
          >
            <Ionicons name="camera-reverse" size={24} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.captureButton} 
            onPress={takePicture}
            disabled={!cameraReady || isProcessing}
          >
            <View style={[
              styles.captureButtonInner,
              isProcessing && styles.captureButtonProcessing
            ]} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => router.back()}
            disabled={isProcessing}
          >
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {isProcessing && (
          <View style={styles.processingOverlay}>
            <ThemedText style={styles.processingText}>
              Procesando imagen...
            </ThemedText>
          </View>
        )}
      </CameraView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    color: 'white',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideFrame: {
    width: width * 0.8,
    height: height * 0.6,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
    paddingBottom: 60, 
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 15,
    borderRadius: 50,
    minWidth: 60,
  },
  primaryButton: {
    backgroundColor: '#265373',
  },
  buttonText: {
    fontSize: 12,
    color: 'white',
    marginTop: 5,
  },
  captureButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 4,
    borderColor: 'white',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  captureButtonProcessing: {
    backgroundColor: '#cccccc',
  },
  preview: {
    flex: 1,
    width: '100%',
  },
  processingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  processingText: {
    color: 'white',
    fontSize: 18,
  },
});
