// contexts/auth-context.tsx
import { IProfile } from "@/models/profile.model";
import { supabase } from "@/utils/supabase";
import { User } from "@supabase/supabase-js";
import React, { createContext, useEffect, useState } from "react";

interface AuthContextType {
    isAppReady: boolean;
    isAuthenticated: boolean;
    user: User | null;
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
    getProfile: () => Promise<any>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

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
        setIsAuthenticated(true);
        return data;
    };

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
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
        if (profile) {
            return;
        }
        if (!user) throw new Error("No authenticated user");

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
    };

    const getProfile = async () => {
        if (profile) {
            return profile;
        }

        const { data: profiles, error: profiles_error } = await supabase
            .from("profiles")
            .select("*");
        if (profiles_error) {
            throw profiles_error;
        }

        return profiles.length > 0 ? profiles[0] : undefined;
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
                getProfile,
                user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
