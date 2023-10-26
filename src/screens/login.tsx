import { View, Text, Platform } from 'react-native';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../contexts/auth';
import Input from '../components/input';
import Button from '../components/button';
import CustomText from '../components/customText';
import { KeyboardAvoidingView } from 'react-native';
import CustomView from '../components/customView';

type Inputs = {
    email: string;
    password: string;
}

const fieldsValidationSchema = yup.object().shape({
    email: yup
        .string()
        .required('Digite seu e-mail')
        .email('Digite um e-mail válido'),
    password: yup
        .string()
        .required('Digite sua senha')
});


function Login() {
    const navigation = useNavigation();
    const { signIn } = useAuth();
    const { register, setValue, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(fieldsValidationSchema)
    });

    useEffect(() => {
        register('email');
        register('password');
    }, [register]);


    const onSubmit = async ({ email, password }: Inputs) => {
        try {
            await signIn(email, password);
        } catch (err: any) {
            alert(err);
        }
    }

    return (
        <CustomView className="items-center w-full">
            <KeyboardAvoidingView
                className="w-screen h-screen px-8 justify-center items-center"
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View id="header" className="items-center space-y-2 mb-4">
                    <CustomText className="text-3xl tracking-tighter font-bold">HnNotes</CustomText>
                    <CustomText className="text-lg">Make Your login in the Application</CustomText>
                </View>
                <View className="space-y-3 w-full">
                    <Input
                        placeholder="E-mail"
                        onChangeText={text => setValue('email', text)}
                        error={!!errors.email}
                        errorText={errors.email?.message}
                    />
                    <Input
                        placeholder="Password"
                        secureTextEntry
                        onChangeText={text => setValue('password', text)}
                        error={!!errors.password}
                        errorText={errors.password?.message}
                    />
                    <Button onPress={handleSubmit(onSubmit)}>
                        <CustomText className="text-white font-bold text-md">Login</CustomText>
                    </Button>
                    <CustomText onPress={() => navigation.navigate('register')} className="text-center text-blue-500">Não possui uma conta? Crie uma</CustomText>
                </View>
            </KeyboardAvoidingView>
        </CustomView>
    );
}

export default Login;