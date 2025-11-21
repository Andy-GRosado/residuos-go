import ReportContainer from "@/src/modules/report/report-container";
import { useLocalSearchParams } from "expo-router";



export default function ReportByIdScreen() {
    const { id } = useLocalSearchParams();
    return (
        <ReportContainer reportId={id as string}></ReportContainer>
    )
}
