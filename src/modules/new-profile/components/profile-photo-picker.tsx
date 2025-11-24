import { useThemeColors } from "@/src/shared/hooks/use-theme-color";
import { ThemeConfigType } from "@/src/store/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";


type Gender = "M" | "F"

const ProfilesUrl: Record<Gender, string[]> = {
    "M": [
        "https://avatar.iran.liara.run/public/1",
        "https://avatar.iran.liara.run/public/22",
        "https://avatar.iran.liara.run/public/32",
        "https://avatar.iran.liara.run/public/27",
        "https://avatar.iran.liara.run/public/16",
        "https://avatar.iran.liara.run/public/34",
    ],
    "F": [
        "https://avatar.iran.liara.run/public/54",
        "https://avatar.iran.liara.run/public/56",
        "https://avatar.iran.liara.run/public/78",
        "https://avatar.iran.liara.run/public/55",
        "https://avatar.iran.liara.run/public/57",
        "https://avatar.iran.liara.run/public/90",
    ]
}

export type ProfilePhotoPickerProps = {
    onChangeGender: (gender: Gender) => any;
    onChangeProfileUrl: (photoUrl: string) => any;
}

export function ProfilePhotoPicker(props: ProfilePhotoPickerProps) {
    const themeColors = useThemeColors() as ThemeConfigType;
    const [gender, setGender] = useState<"M" | "F">("M");
    const [profileUrl, setProfileUrl] = useState<string>(ProfilesUrl[gender][0]);
    const [chossingProfile, setChossingProfile] = useState<boolean>(false);

    useEffect(() => {
        props.onChangeGender("M");
        props.onChangeProfileUrl(ProfilesUrl[gender][0]);
    }, [])


    return (
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', gap: 16, padding: 16 }}>
            <View style={{ position: 'relative', width: 140, height: 140, borderWidth: 2, borderColor: 'white', borderRadius: 84 }}>
                <TouchableOpacity
                    style={[StyleSheet.absoluteFill]}
                    activeOpacity={0.7}
                    onPress={() => { setChossingProfile(prev => !prev) }}
                >
                    <Image
                        style={[StyleSheet.absoluteFill, { margin: 8 }]}
                        source={{ uri: profileUrl }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                        setGender((prev: any) => {
                            const new_gender = prev == 'M' ? 'F' : 'M';
                            setProfileUrl(ProfilesUrl[new_gender][0]);
                            props.onChangeGender(new_gender);
                            props.onChangeProfileUrl(ProfilesUrl[new_gender][0]);
                            return new_gender;
                        });
                    }}
                >
                    <View
                        style={[
                            {
                                display: chossingProfile ? 'none' : 'flex',
                                position: 'absolute',
                                top: -24,
                                left: -24,
                                zIndex: 2,
                                borderWidth: 2,
                                borderColor: 'white',
                                borderRadius: 20,
                                padding: 4,
                            }
                        ]}

                    >
                        <View style={{ position: 'relative' }}>
                            <Ionicons name={gender == "M" ? "male" : "female"} color={gender == 'M' ? "lightblue" : "pink"} size={28} />
                            <Ionicons
                                name="swap-horizontal-outline"
                                color={"white"}
                                size={16}
                                style={{
                                    position: 'absolute',
                                    bottom: -14,
                                    left: -14,
                                    padding: 2,
                                    backgroundColor: themeColors.background[400],
                                    borderRadius: 24,
                                    borderWidth: 1,
                                    borderColor: 'white',
                                    zIndex: 40
                                }}
                            />

                        </View>
                    </View>

                </TouchableOpacity>
            </View>

            {/* Profile picker */}
            <View
                style={[
                    {
                        width: '100%',
                        justifyContent: 'center',
                        display: chossingProfile ? 'flex' : 'none',
                        flex: 1,
                        flexShrink: 1,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        backgroundColor: themeColors.background[400],
                        borderRadius: 8,
                        borderWidth: 2,
                        borderColor: 'white',
                        padding: 8,
                        gap: 8,
                        zIndex: 10
                    }
                ]}
            >
                {
                    ProfilesUrl[gender].map((profileUrl: string, index: number) => {

                        return (

                            <Pressable
                                key={index}
                                onPress={() => {
                                    props.onChangeProfileUrl(profileUrl);
                                    setProfileUrl(profileUrl)
                                }}
                            >
                                <Image
                                    source={{ uri: profileUrl }}
                                    style={{ width: 54, height: 54 }}
                                />
                            </Pressable>
                        )
                    })
                }
            </View>


        </View>
    )
}
