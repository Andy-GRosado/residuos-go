import ThemedText from "@/src/shared/components/themed-text"
import ThemedView from "@/src/shared/components/themed-view"


export type ProfileContainerProps = {
    
}

export function ProfileContainer(props: ProfileContainerProps) {


    return (
        <ThemedView>
            <ThemedText>This is my profile</ThemedText>
        </ThemedView>
    )
}