import { ThemedText } from '@/app-example/components/themed-text';
import { ThemedView } from '@/app-example/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
    Alert,
    Dimensions,
    Pressable,
    StyleSheet,
    View
} from 'react-native';
import MapView, {
    Marker,
    PROVIDER_GOOGLE,
    Region
} from 'react-native-maps';

const { width, height } = Dimensions.get('window');

// Coordenadas iniciales (puedes usar tu ubicación)
const INITIAL_REGION: Region = {
  latitude: 19.4326, // Ciudad de México
  longitude: -99.1332,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

// Marcadores de ejemplo
const SAMPLE_MARKERS = [
  {
    id: 1,
    title: "Punto de Reciclaje 1",
    description: "Centro de reciclaje principal",
    coordinate: {
      latitude: 19.4326,
      longitude: -99.1332,
    },
  },
  {
    id: 2,
    title: "Punto de Reciclaje 2",
    description: "Estación de reciclaje norte",
    coordinate: {
      latitude: 19.4386,
      longitude: -99.1382,
    },
  },
  {
    id: 3,
    title: "Punto de Reciclaje 3",
    description: "Estación de reciclaje sur",
    coordinate: {
      latitude: 19.4266,
      longitude: -99.1282,
    },
  },
];

export default function MapScreen() {
  const [region, setRegion] = useState<Region>(INITIAL_REGION);
  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const mapRef = useRef<MapView>(null);

  const handleMarkerPress = (marker: any) => {
    setSelectedMarker(marker);
    Alert.alert(
      marker.title,
      marker.description,
      [
        { text: "Cerrar", style: "cancel" },
        { 
          text: "Ver detalles", 
          onPress: () => console.log("Ver detalles:", marker.id) 
        },
      ]
    );
  };

  const handleMapPress = () => {
    setSelectedMarker(null);
  };

  const centerMap = () => {
    mapRef.current?.animateToRegion(INITIAL_REGION, 1000);
  };

  const zoomIn = () => {
    const newRegion: Region = {
      ...region,
      latitudeDelta: region.latitudeDelta / 2,
      longitudeDelta: region.longitudeDelta / 2,
    };
    setRegion(newRegion);
    mapRef.current?.animateToRegion(newRegion, 500);
  };

  const zoomOut = () => {
    const newRegion: Region = {
      ...region,
      latitudeDelta: region.latitudeDelta * 2,
      longitudeDelta: region.longitudeDelta * 2,
    };
    setRegion(newRegion);
    mapRef.current?.animateToRegion(newRegion, 500);
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Mapa de residuos
        </ThemedText>
        <ThemedText type="default" style={styles.subtitle}>
          Reporta acumulación de residuos cerca de tí
        </ThemedText>
      </View>

      {/* Mapa */}
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={INITIAL_REGION}
          region={region}
          onRegionChangeComplete={setRegion}
          onPress={handleMapPress}
          showsUserLocation={true}
          showsMyLocationButton={false}
          showsCompass={true}
          showsScale={true}
        >
          {SAMPLE_MARKERS.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}
              onPress={() => handleMarkerPress(marker)}
              pinColor="#265373"
            />
          ))}
        </MapView>

        {/* Controles del mapa */}
        <View style={styles.controlsContainer}>
          <Pressable style={styles.controlButton} onPress={centerMap}>
            <Ionicons name="locate" size={20} color="#265373" />
          </Pressable>
          
          <View style={styles.zoomControls}>
            <Pressable style={styles.zoomButton} onPress={zoomIn}>
              <Ionicons name="add" size={20} color="#265373" />
            </Pressable>
            <Pressable style={styles.zoomButton} onPress={zoomOut}>
              <Ionicons name="remove" size={20} color="#265373" />
            </Pressable>
          </View>
        </View>

        {/* Botón de ubicación actual */}
        <Pressable style={styles.myLocationButton}>
          <Ionicons name="navigate" size={24} color="white" />
        </Pressable>
      </View>

      {/* Información del marcador seleccionado */}
      {selectedMarker && (
        <View style={styles.markerInfo}>
          <ThemedText type="subtitle" style={styles.markerTitle}>
            {selectedMarker.title}
          </ThemedText>
          <ThemedText type="default" style={styles.markerDescription}>
            {selectedMarker.description}
          </ThemedText>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#265373',
  },
  title: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  controlsContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    gap: 10,
  },
  controlButton: {
    backgroundColor: 'white',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  zoomControls: {
    backgroundColor: 'white',
    borderRadius: 22,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  zoomButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  myLocationButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#265373',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  markerInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  markerTitle: {
    color: '#265373',
    marginBottom: 5,
  },
  markerDescription: {
    color: '#666',
  },
});
