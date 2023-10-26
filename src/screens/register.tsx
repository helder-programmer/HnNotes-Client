import { View, Text, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from '@react-navigation/native'

import Input from '../components/input';
import { AuthService } from '../services/auth';
import Button from '../components/button';
import CustomText from '../components/customText';
import CustomView from '../components/customView';


type Inputs = {
    name: string;
    email: string;
    password: string;
}

const fieldsValidationSchema = yup.object().shape({
    name: yup
        .string()
        .required('O nome é obrigatório'),
    email: yup
        .string()
        .required('O e-mail é obrigatório')
        .email('Digite um e-mail válido'),
    password: yup
        .string()
        .required('A senha é obrigatória')
})


function Register() {
    const navigation = useNavigation();
    const { register, setValue, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(fieldsValidationSchema)
    });


    useEffect(() => {
        register('email');
        register('password');
    }, [register]);


    const onSubmit = async ({ name, email, password }: Inputs) => {
        try {
            await AuthService.create({ name, email, password });
            navigation.navigate('login');
        } catch (err: any) {
            console.log(err);
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
                        placeholder="Name"
                        onChangeText={text => setValue('name', text)}
                        error={!!errors.name}
                        errorText={errors.name?.message}
                    />
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
                        <CustomText className="text-white font-bold text-md">Create Your Account</CustomText>
                    </Button>
                    <CustomText onPress={() => navigation.navigate('login')} className="text-center text-blue-500">Já possui conta? Faça seu login</CustomText>
                </View>
            </KeyboardAvoidingView>
        </CustomView>
    );
}

export default Register;