import ReportContainer from "@/src/modules/report/report-container";
import { useLocalSearchParams } from "expo-router";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default function ReportByIdScreen() {
    const { id } = useLocalSearchParams();
    return (
        <KeyboardAwareScrollView
            enableOnAndroid={true}
            extraHeight={900}
            keyboardShouldPersistTaps="always"
            keyboardOpeningTime={0}
            contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: 300,
            }}
        >
            <ReportContainer reportId={id as string}></ReportContainer>

        </KeyboardAwareScrollView>
    )
}
