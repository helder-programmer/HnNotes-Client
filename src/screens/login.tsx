import { View, Text, Pressable } from 'react-native';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";

import Input from '../components/input';


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
})


function Login() {
    const { register, setValue, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(fieldsValidationSchema)
    });

    useEffect(() => {
        register('email');
        register('password')
    }, [register]);


    const onSubmit = ({ email, password }: Inputs) => {

    }

    return (
        <View className="w-screen px-2 justify-center items-center">
            <View className="border items-center w-full border-gray-400 rounded-lg p-4 shadow-md">
                <View id="header" className="items-center space-y-2 mb-4">
                    <Text className="text-2xl font-bold">HnNotes</Text>
                    <Text className="text-lg">Make Your login in the Application</Text>
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
                    <Pressable
                        className="p-3 bg-blue-500 w-full rounded-md items-center shadow-lg text-white font-bold"
                        onPress={handleSubmit(onSubmit)}
                    >
                        Login
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

export default Login;