import { IBoundingBox } from "@/src/models/bbox.model";
import ThemedText from "@/src/shared/components/themed-text";
import ThemedView from "@/src/shared/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { useLocationPermission } from "react-native-vision-camera";

export type PhotoPreviewProps = {
    photoUri: string;
    boundingBox: IBoundingBox[];
    location: Location.LocationObjectCoords,
    onRetake?: () => any;
    onSubmit?: () => any;
}

const { width, height } = Dimensions.get('window');

export function PhotoPreview(props: PhotoPreviewProps) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { hasPermission, requestPermission } = useLocationPermission()

    const handlePhotoSubmit = useCallback(async () => {
        try {
            if (!hasPermission) {
                await requestPermission()
            }

            console.log({
                photoUri: props.photoUri,
                bbox: JSON.stringify(props.boundingBox),
                lat: props.location.latitude,
                lon: props.location.longitude,
            },)

            router.push({
                pathname: "/(app)/report/create",
                params: {
                    photoUri: props.photoUri, // photo ya es el URI string
                    bbox: JSON.stringify(props.boundingBox),
                    location: JSON.stringify(props.location)
                },
            });

        } catch (error) {

        }
    }, [])

    console.log(props.photoUri)
    return (
        <ThemedView style={[
            { flex: 1, backgroundColor: "black", paddingHorizontal: 20, }
        ]}>
            <View>

            </View>
            <Image
                source={{ uri: props.photoUri }}
                style={[
                    {
                        flex: 1,
                        width: '100%',
                        backgroundColor: "rgba(0,0,0,0.7)",
                        justifyContent: "center",
                        alignItems: "center",
                    }
                ]}
                contentFit="contain"
                onLoadEnd={() => { setIsLoading(false) }}
            />
            <View style={[
                {
                    flexDirection: "row",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    padding: 20,
                    paddingBottom: 60,
                    justifyContent: "space-between",
                    alignItems: "center",
                }
            ]}>
                <TouchableOpacity
                    style={[
                        {
                            flexDirection: 'row',
                            gap: 8,
                            alignItems: "center",
                            backgroundColor: "rgba(44, 44, 44, 0.7)",
                            paddingHorizontal: 16,
                            paddingVertical: 8,
                            borderRadius: 50,
                            minWidth: 60,
                        }
                    ]}
                    onPress={() => { props.onRetake && props.onRetake() }}
                    disabled={isLoading}
                >
                    <Ionicons name="refresh" size={20} color="white" />
                    <ThemedText>
                        Volver a tomar
                    </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        {
                            flexDirection: 'row',
                            gap: 8,
                            alignItems: "center",
                            backgroundColor: "rgba(0,0,0,0.7)",
                            paddingHorizontal: 16,
                            paddingVertical: 8,
                            borderRadius: 50,
                            minWidth: 60,
                        },
                        {
                            backgroundColor: "#265373",
                        }
                    ]}
                    onPress={
                        () => {
                            if (props.onSubmit) {
                                props.onSubmit();
                            } else {
                                handlePhotoSubmit();
                            }

                        }
                    }
                    disabled={isLoading}
                >
                    <Ionicons name="checkmark" size={20} color="white" />
                    <ThemedText>
                        {isLoading ? "Procesando..." : "Usar foto"}
                    </ThemedText>
                </TouchableOpacity>
            </View>
        </ThemedView>
    )
}

