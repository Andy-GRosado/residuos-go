
import { ThemeConfigType } from "@/src/store/theme";
import { Image } from "expo-image";
import { View, ViewProps } from "react-native";


export type PhotoReportProps = {
    containerProps?: ViewProps;
    themeColors: ThemeConfigType;
    photoUri: string,
}

export default function PhotoReport(props: PhotoReportProps) {

    return (
        <View style={[
            {
                margin: 16,
                borderRadius: 12,
                overflow: 'hidden',
                borderWidth: 2,
                borderColor: props.themeColors.background[200]
            },
            (props.containerProps) && props.containerProps
        ]}>
            <Image
                source={{ uri: props.photoUri }}
                style={{
                    width: "100%",
                    height: 250
                }}
            />
        </View>
    )
}