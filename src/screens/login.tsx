import { View, Text, Platform, ActivityIndicator } from 'react-native';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from '@react-navigation/native';
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

const fieldsValidationSchema = yup.object().shape({
    email: yup
        .string()
        .required('Plase, type your e-mail')
        .email('Type a valid e-mail'),
    password: yup
        .string()
        .required('Plase, type your password')
});


function Login() {
    const navigation = useNavigation();
    const { signIn } = useAuth();
    const { theme } = useTheme();

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(fieldsValidationSchema)
    });

    const [error, setError] = useState('');

    useEffect(() => {
        register('email');
        register('password');
    }, [register]);


    const onSubmit = async ({ email, password }: Inputs) => {
        try {
            await signIn(email, password);
        } catch (err: any) {
            if (err.response) {
                setError(err.response.data.message);
            } else {
                setError(err.message);
            }
        }
    }

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
                <CustomText className="text-4xl tracking-tighter font-bold text-white">HnNotes</CustomText>
                <CustomText className="text-white text-lg">Create your account</CustomText>
            </Animatable.View>

            <Animatable.View
                className="w-full flex-grow px-8 rounded-t-[30px] pt-8 pb-2 justify-between"
                animation="fadeInUp"
                delay={600}
                style={{ backgroundColor: theme.colors.primary }}
            >
                <View>
                    <View className="space-y-4">
                        <View>
                            <CustomText className="text-lg">E-mail</CustomText>
                            <Input
                                placeholder="Type your e-mail"
                                className="border-0 border-b"
                                onChangeText={text => setValue('email', text)}
                                error={!!errors.email}
                                errorText={errors.email?.message}
                                fullWidth
                            />
                        </View>
                        <View>
                            <CustomText className="text-lg">Password</CustomText>
                            <Input
                                placeholder="Type your password"
                                secureTextEntry
                                className="border-0 border-b"
                                onChangeText={text => setValue('password', text)}
                                error={!!errors.password}
                                errorText={errors.password?.message}
                                fullWidth
                            />
                        </View>
                    </View>
                    <View className="mt-3 space-y-3">
                        <Button onPress={handleSubmit(onSubmit)} fullWidth>
                            {
                                isSubmitting
                                    ?
                                    <ActivityIndicator size="small" color="#FFFFFF" />
                                    :
                                    <CustomText className="text-white font-bold text-md">Login</CustomText>
                            }
                        </Button>
                        {
                            error && <Text className="text-xs text-red-500">Error: {error}</Text>
                        }
                        <CustomText onPress={() => navigation.navigate('register')} className="text-center text-blue-500">Não possui uma conta? Crie uma</CustomText>
                    </View>
                </View>

                <ThemeSwitcher />
            </Animatable.View>
        </KeyboardAvoidingView>
    );
}

export default Login;