// contexts/auth-context.tsx
import { supabase } from "@/utils/supabase";
import { User } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    isAppReady: boolean;
    isAuthenticated: boolean;
    markAppAsReady: () => void;
    signIn: (email: string, password: string) => Promise<any>;
    signUp: (email: string, password: string, username: string) => Promise<any>;
    signOut: () => Promise<void>;
    user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAppReady, setIsAppReady] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Verificar sesión activa
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

    const signUp = async (
        email: string,
        password: string,
        username: string
    ) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data:{
                    display_name: username,
                }
            }
        });

        if (error) throw error;
        return data;
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
                signUp,
                signOut,
                user,
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
