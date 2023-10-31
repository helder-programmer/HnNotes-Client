import { View, Text, Pressable, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

import Input from '../components/input';
import { AuthService } from '../services/auth';
import Button from '../components/button';
import CustomText from '../components/customText';
import { useTheme } from '../contexts/theme';
import ThemeSwitcher from '../components/themeSwitcher';


type Inputs = {
    name: string;
    email: string;
    password: string;
}

const fieldsValidationSchema = yup.object().shape({
    name: yup
        .string()
        .required('Name is required!'),
    email: yup
        .string()
        .required('E-mail is required')
        .email('Type a valid e-mail!'),
    password: yup
        .string()
        .required('Password is required!')
})


function Register() {
    const navigation = useNavigation();
    const { theme } = useTheme();
    const { register, setValue, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(fieldsValidationSchema)
    });
    const [error, setError] = useState('');


    useEffect(() => {
        register('email');
        register('password');
    }, [register]);


    const onSubmit = async ({ name, email, password }: Inputs) => {
        try {
            await AuthService.create({ name, email, password });
            navigation.navigate('login');
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
                            <CustomText className="text-lg">Name</CustomText>
                            <Input
                                placeholder="E-mail"
                                className="border-0 border-b"
                                onChangeText={text => setValue('name', text)}
                                error={!!errors.name}
                                errorText={errors.name?.message}
                                fullWidth
                            />
                        </View>
                        <View>
                            <CustomText className="text-lg">E-mail</CustomText>
                            <Input
                                placeholder="E-mail"
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
                                placeholder="Password"
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
                                    <CustomText className="text-white font-bold text-md">Create Account</CustomText>
                            }
                        </Button>
                        {
                            error && <Text className="text-xs text-red-500">Error: {error}</Text>
                        }
                        <CustomText onPress={() => navigation.goBack()} className="text-center text-blue-500">You have account? make your Login!</CustomText>
                    </View>
                </View>

                <ThemeSwitcher />
            </Animatable.View>
        </KeyboardAvoidingView>
    );
}

export default Register;