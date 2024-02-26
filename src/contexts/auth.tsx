import React, { Dispatch, SetStateAction, createContext, useContext, useState, useEffect } from "react";

import { IUser } from "../@types/entities";
import { AuthService } from "../services/auth";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from "expo-auth-session";
import { ToastAndroid } from "react-native";

interface IAuthContext {
    user: IUser | null;
    signed: boolean;
    callGoogleAuth(): void;
    setUser: Dispatch<SetStateAction<IUser | null>>;
    signOut(): Promise<void>;
    requestIsRunning: boolean;
}

interface IGoogleData {
    id: string;
    email: string;
    name: string;
    picture: string;
}


const AuthContext = createContext({} as IAuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<IUser | null>(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: '1051088932850-q2poc746pj8k9q7tafa79lc5ug387r23.apps.googleusercontent.com',
        redirectUri: makeRedirectUri()
    });
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
            setUser(null);
            navigation.navigate('login');
        }
    }

    const signIn = async () => {
        try {
            const googleData = await getGoogleData(response);

            if (!googleData) return;

            const { token, user } = await AuthService.loginOrCreate({
                email: googleData.email,
                googleId: googleData.id,
                name: googleData.name,
                picture: googleData.picture
            });

            await SecureStore.setItemAsync('hn-token', token);

            setUser(user);
        } catch (err: any) {
            ToastAndroid.show(err.message, ToastAndroid.SHORT);
            console.log(err.message);
        }

    }

    const signOut = async () => {
        await SecureStore.deleteItemAsync('hn-token');
        setUser(null);
        navigation.navigate('login');
    }


    const getGoogleData = async (response: any) => {
        try {
            const fetchResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
                headers: {
                    Authorization: `Bearer ${response.authentication?.accessToken}`
                }
            });

            const data: IGoogleData = await fetchResponse.json();

            return data;
        } catch (err: any) {
            ToastAndroid.show(err.message, ToastAndroid.SHORT);
            console.log(err);
        }
    }

    const callGoogleAuth = () => {
        promptAsync();
    }

    const getResponse = () => {
        if (response) {
            switch (response.type) {
                case 'error':
                    ToastAndroid.show('Erro ao se autenticar', ToastAndroid.SHORT);
                    break;
                case 'cancel':
                    ToastAndroid.show('Login cancelado', ToastAndroid.SHORT);
                case 'success':
                    signIn();
                    break;
                default:
                    () => { };
            }
        }
    }

    useEffect(() => {
        getResponse();
    }, [response]);

    useEffect(() => {
        getUserInformations();
    }, []);


    return (
        <AuthContext.Provider
            value={{
                signed: !!user,
                user,
                setUser,
                requestIsRunning: !!request,
                callGoogleAuth,
                signOut
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {
    const authContext = useContext(AuthContext);
    return authContext;
}