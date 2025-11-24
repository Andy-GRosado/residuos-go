import { TensorBoundingBox } from "@/src/models/bbox.model";
import NewReportContainer from "@/src/modules/new-report/new-report-container";
import * as Location from 'expo-location';
import { useLocalSearchParams } from "expo-router";

export default function ReportCreateScreen() {
    const { photoUri, bbox, location } = useLocalSearchParams();

    return (
        <NewReportContainer 
            photoUri={photoUri as string} 
            boundingBox={JSON.parse(bbox as string) as TensorBoundingBox[]} 
            location={JSON.parse(location as string) as Location.LocationObjectCoords} 
        />
    )
}
