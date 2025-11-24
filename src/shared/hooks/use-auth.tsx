import { useContext } from "react";

// contexts/auth-context.tsx
import { IProfile } from "@/src/models/profile.model";
import { supabase } from "@/src/shared/utils/supabase";
import { User } from "@supabase/supabase-js";
import { router } from "expo-router";
import React, { createContext, useEffect, useState } from "react";

interface AuthContextType {
    isAppReady: boolean;
    isAuthenticated: boolean;
    user: User | null;
    profile: IProfile | null
    markAppAsReady: () => void;
    signIn: (email: string, password: string) => Promise<any>;
    signOut: () => Promise<void>;
    signUp: (email: string, password: string) => Promise<any>;
    createProfile: (
        names?: string,
        last_names?: string,
        username?: string,
        gender?: string,
        phone_number?: number,
        photo_url?: string
    ) => Promise<void>;
    getUserProfile: () => Promise<any>;
    getProfileById: (id: string) => Promise<any>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAppReady, setIsAppReady] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<IProfile | null>(null);

    useEffect(() => {
        const getSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
        };

        getSession();

        // Listener de cambios de auth
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signUp = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            console.log("Error de Supabase:", error);

            if (error.message?.includes("User already registered")) {
                throw new Error(
                    "Este email ya está registrado. ¿Quieres iniciar sesión?"
                );
            }

            throw error;
        }

        // ✅ Esta es la forma correcta de detectar usuario duplicado
        if (
            data.user &&
            data.user.identities &&
            data.user.identities.length === 0
        ) {
            throw new Error("Este email ya está registrado");
        }

    };

    const signIn = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        
        if (error) throw error;
        
        setUser(data.user);
        setIsAuthenticated(true);

        const profile = await getProfileById(data.user.id);
        if (!profile) {
            setProfile(null);
            router.push('/(app)/new-profile')
            return data;
        }
        
        setProfile(profile);
        router.push('/(app)/map')
        return data;
    };

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        setUser(null);
        setIsAuthenticated(false);
    };

    const createProfile = async (
        names?: string,
        last_names?: string,
        username?: string,
        gender?: string,
        phone_number?: number,
        photo_url?: string
    ) => {
        if (!user) throw new Error("No authenticated user");

        const { data: match_profiles, error } = await supabase.from('profiles').select('*').eq('username', username);

        if (match_profiles && match_profiles.length > 0) {
            throw new Error('El nombre de usuario ya existe');
        }

        const { data: current_profile, error: profile_error } = await supabase
            .from("profiles")
            .insert({
                names: names ?? null,
                last_names: last_names ?? null,
                username: username ?? null,
                gender: gender ?? null,
                phone_number: phone_number ?? null,
                photo_url: photo_url ?? null,
                created_by: user.id,
            });

        if (profile_error) throw profile_error;

        setProfile(current_profile);
    };

    const getProfileById = async (id: string) => {
        const { data: profiles, error: profiles_error } = await supabase
            .from("profiles")
            .select("*").eq('created_by', id);
        if (profiles_error) {
            throw profiles_error;
        }

        if (profiles.length > 0) {
            setProfile(profiles[0]);
            return profiles[0]
        } else {
            setProfile(null);
            return undefined;
        }
    };

    const getUserProfile = async () => {
        if (!user) {
            return undefined;
        }
        
        const profile = await getProfileById(user.id);
        setProfile(profile);
    };

    const markAppAsReady = () => {
        setIsAppReady(true);
    };

    return (
        <AuthContext.Provider
            value={{
                isAppReady,
                isAuthenticated,
                markAppAsReady,
                signIn,
                signOut,
                signUp,
                createProfile,
                getUserProfile,
                getProfileById,
                user,
                profile
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
