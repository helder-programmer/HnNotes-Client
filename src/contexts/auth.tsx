import React, { Dispatch, SetStateAction, createContext, useContext, useState, useEffect } from "react";

import { IUser } from "../@types/entities";
import { AuthService } from "../services/auth";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';

interface IAuthContext {
    user: IUser | null;
    setUser: Dispatch<SetStateAction<IUser | null>>;
    signIn(email: string, password: string): Promise<void>;
    logout(): Promise<void>;
}

const AuthContext = createContext({} as IAuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<IUser | null>(null);
    const navigation = useNavigation();
    
    
    const getUserInformations = async () => {
        try {
            const token = await SecureStore.getItemAsync('hn-token');

            if (token) {
                const user = await AuthService.recoverUserInformations();
                setUser(user);
            }
        } catch (err: any) {
            console.log(`Invalid token ${err}`);
            navigation.navigate('login');
        }
    }
    
    const signIn = async (email: string, password: string) => {
        const { token, user } = await AuthService.login({ email, password });
        await SecureStore.setItemAsync('hn-token', token);

        setUser(user);
    }

    const logout = async () => {
        await SecureStore.deleteItemAsync('hn-token');
        setUser(null);
        navigation.navigate('login');
    }
    
    useEffect(() => {
        getUserInformations();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, signIn, logout }}>
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {
    const authContext = useContext(AuthContext);
    return authContext;
}