import React, { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import * as SecureStore from 'expo-secure-store';

import { IUser } from "../@types/entities";
import { AuthService } from "../services/auth";
import { useNavigation } from "@react-navigation/native";

interface IAuthContext {
    user: IUser | null;
    setUser: Dispatch<SetStateAction<IUser | null>>;
    signIn(email: string, password: string): Promise<void>;
    logout(): void;
}

const AuthContext = createContext({} as IAuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<IUser | null>(null);
    const navigation = useNavigation();

    const signIn = async (email: string, password: string) => {
        const { token, user } = await AuthService.login({ email, password });
        SecureStore.setItem('hn-token', token);

        setUser(user);
    }

    const logout = () => {
        SecureStore.setItem('hn-token', '');

        setUser(null);
        navigation.navigate('login');
    }

    return (
        <AuthContext.Provider value={{ user, setUser, signIn, logout }}>
            {children}
        </AuthContext.Provider>
    );
}