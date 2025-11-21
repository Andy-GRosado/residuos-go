import { IBoundingBox } from "@/src/models/bbox.model";
import NewReportContainer from "@/src/modules/new-report/new-report-container";
import { useLocalSearchParams } from "expo-router";

export default function ReportCreateScreen() {
    const { photoUri, bbox } = useLocalSearchParams();

    return (
        <NewReportContainer 
            photoUri={photoUri as string} 
            bounding_box={JSON.parse(bbox as string) as IBoundingBox[]} 
        />
    )
}
