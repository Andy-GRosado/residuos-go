import { IComment } from "@/src/models/comments.model"
import { ICreatedBy } from "@/src/models/created_by.model"
import { IFromSupabase } from "@/src/models/supabase.model"
import TextInput from "@/src/shared/components/input/input-text"
import PrimaryButton from "@/src/shared/components/primary-button"
import ThemedText from "@/src/shared/components/themed-text"
import { useAuth } from "@/src/shared/hooks/use-auth"
import { useModal } from "@/src/shared/hooks/use-modal"
import { useThemeColors } from "@/src/shared/hooks/use-theme-color"
import { supabase } from "@/src/shared/utils/supabase"
import { formatUTCDateToTimePassed } from "@/src/shared/utils/utils"
import { ThemeConfigType } from "@/src/store/theme"
import { Ionicons } from "@expo/vector-icons"
import { Image } from "expo-image"
import { useCallback, useEffect, useState } from "react"
import { ActivityIndicator, View } from "react-native"

export type ReportCommentsProps = {
    reportId: string
}

export function ReportComments(props: ReportCommentsProps) {
    const { profile } = useAuth();
    const { showModal } = useModal();
    const themeColors = useThemeColors() as ThemeConfigType;
    const [comments, setComments] = useState<((IComment & IFromSupabase) & ICreatedBy)[]>([])
    const [newComment, setNewComment] = useState('');
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);

    const fetchAllData = useCallback(async (id: string) => {
        try {
            const [comments] = await Promise.all([
                supabase
                    .from("comments")
                    .select(`
                        *,
                        created_by:profiles!inner(username, photo_url)
                    `)
                    .eq("report_id", id)
                    .order('created_at', { ascending: false }),
            ]);
            
            if (comments.error) { throw comments.error; };
            return comments.data;
        } catch (error: any) {
            throw error;
        }
    }, [])

    // Post comment
    const postComment = useCallback(async (comment: string) => {
        if (!comment.trim() || !profile || isSubmittingComment) return;

        setIsSubmittingComment(true);
        try {
            const { data, error } = await supabase
                .from('comments')
                .insert({
                    report_id: props.reportId,
                    content: comment.trim(),
                    created_by: profile.id,
                })
                .select(`*, created_by:profiles!inner(username, photo_url)`)
                .single();

            if (error) throw error;
            
            setComments(prev => [data, ...prev]);
            setNewComment('');
        } catch (error: any) {
            showModal({
                title: 'Error',
                message: error.message || 'No se pudo publicar el comentario',
                type: 'info'
            });
        } finally {
            setIsSubmittingComment(false);
        }
    }, [profile, showModal, isSubmittingComment]);


    useEffect(() => {
        (async() => {
            const comments = await fetchAllData(props.reportId);
            setComments(comments);
            // console.log(comments);
        })()
    }, [])

    return (
        <View style={{ marginBottom: 60, gap: 12 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: themeColors.background[200] }} />
                <ThemedText>{comments.length} Comentarios</ThemedText>
            </View>

            {/* New Comment Input */}
            <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
                <Image
                    source={{ uri: profile?.photo_url || "https://avatar.iran.liara.run/public/12" }}
                    style={{
                        width: 40,
                        height: 40,
                        borderWidth: 1,
                        borderColor: themeColors.text[500],
                        borderRadius: 20
                    }}
                />
                <TextInput
                    style={{
                        flex: 1,
                        marginBottom: 0,
                        borderColor: themeColors.background[200],
                    }}
                    value={newComment}
                    onChangeText={setNewComment}
                    placeholder="Comenta algo..."
                    returnKeyType="send"
                    onSubmitEditing={() => postComment(newComment)}
                />
                <PrimaryButton
                    onPress={() => postComment(newComment)}
                    disabled={isSubmittingComment || !newComment.trim()}
                >
                    {isSubmittingComment ? (
                        <ActivityIndicator size="small" color="white" />
                    ) : (
                        <Ionicons name="send" size={16} color="white" />
                    )}
                </PrimaryButton>
            </View>

            {/* Comments List */}
            <View style={{ gap: 12 }}>
                        {comments.map((comment: IComment & IFromSupabase & ICreatedBy) => (
                            <View key={comment.id} style={{ flexDirection: "row", gap: 8 }}>
                                <Image
                                    source={{ uri: comment.created_by.photo_url || "https://avatar.iran.liara.run/public/12" }}
                                    style={{
                                        width: 32,
                                        height: 32,
                                        borderWidth: 1,
                                        borderColor: themeColors.text[500],
                                        borderRadius: 16
                                    }}
                                />
                                <View style={{ flex: 1 }}>
                                    <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                                        <ThemedText type="bodyBold">
                                            @{comment.created_by.username}
                                        </ThemedText>
                                        <ThemedText type="caption">
                                            {formatUTCDateToTimePassed(comment.created_at)}
                                        </ThemedText>
                                    </View>
                                    <ThemedText style={{ color: themeColors.text[400] }}>
                                        {comment.content}
                                    </ThemedText>
                                </View>
                            </View>
                        ))}
                    </View>
        </View>
    )
}
