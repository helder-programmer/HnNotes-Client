import { View, Text, Platform, ActivityIndicator } from 'react-native';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from '@react-navigation/native';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import * as yup from 'yup';
import * as Animatable from 'react-native-animatable';

import { useAuth } from '../contexts/auth';
import Input from '../components/input';
import Button from '../components/button';
import CustomText from '../components/customText';
import { KeyboardAvoidingView } from 'react-native';
import CustomView from '../components/customView';
import { useTheme } from '../contexts/theme';
import ThemeSwitcher from '../components/themeSwitcher';

type Inputs = {
    email: string;
    password: string;
}


function Login() {
    const navigation = useNavigation();
    const { callGoogleAuth, requestIsRunning } = useAuth();
    const { theme } = useTheme();

    const [error, setError] = useState('');

    return (
        <KeyboardAvoidingView
            className="h-screen"
            style={{ backgroundColor: theme.colors.landing }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <Animatable.View
                id="header"
                className="mb-4 p-4"
                animation="fadeInLeft"
                delay={500}
                style={{ backgroundColor: theme.colors.landing }}
            >
                <CustomText className="text-4xl tracking-tighter font-bold text-white">Welcome to HnNotes</CustomText>
                <CustomText className="text-white text-lg">Make your account</CustomText>
            </Animatable.View>

            <Animatable.View
                className="w-full flex-grow px-8 rounded-t-[30px] pt-8 pb-2 justify-between"
                animation="fadeInUp"
                delay={600}
                style={{ backgroundColor: theme.colors.primary }}
            >
                <View>
                    <GoogleSigninButton
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={callGoogleAuth}
                        disabled={!requestIsRunning}
                    />
                </View>
                <ThemeSwitcher />
            </Animatable.View>
        </KeyboardAvoidingView>
    );
}

export default Login;