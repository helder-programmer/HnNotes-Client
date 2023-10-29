import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text } from 'react-native';
import * as yup from 'yup';

import { useAuth } from '../../contexts/auth';
import Button from '../button';
import CustomText from '../customText';
import Input from '../input';


const fieldsValidationSchema = yup.object().shape({
    name: yup
        .string()
        .required('O nome é obrigatório'),
    email: yup
        .string()
        .required('O e-mail é obrigatório')
        .email('Digite um e-mail válido'),
    oldPassword: yup
        .string()
        .required(),
    newPassword: yup
        .string()
        .required('A senha é obrigatória')
})

function ProfileForm() {
    const { user } = useAuth();

    const { register, setValue, handleSubmit, formState: { errors }, getValues } = useForm({
        resolver: yupResolver(fieldsValidationSchema),
        defaultValues: {
            name: user?.name,
            email: user?.email
        }
    });

    const onSubmit = async () => {

    }

    return (
        <View className="w-full">
            <View className="space-y-3">
                <CustomText className="text-lg">Generics Informations</CustomText>
                <Input
                    placeholder="Name"
                    onChangeText={text => setValue('name', text)}
                    value={getValues('name')}
                    error={!!errors.name}
                    errorText={errors.name?.message}
                    fullWidth
                />
                <Input
                    placeholder="E-mail"
                    onChangeText={text => setValue('email', text)}
                    value={getValues('email')}
                    error={!!errors.email}
                    errorText={errors.email?.message}
                    fullWidth
                />
            </View>
            <View className="space-y-4">
                <CustomText className="text-lg m-0">Password</CustomText>
                <Input
                    placeholder="Old Password"
                    secureTextEntry
                    onChangeText={text => setValue('oldPassword', text)}
                    error={!!errors.oldPassword}
                    errorText={errors.oldPassword?.message}
                    fullWidth
                />
                <Input
                    placeholder="New Password"
                    secureTextEntry
                    onChangeText={text => setValue('newPassword', text)}
                    error={!!errors.newPassword}
                    errorText={errors.newPassword?.message}
                    fullWidth
                />
                <View className="flex flex-row w-full justify-between">
                    <Button className="bg-red-500 w-40">
                        <Text className="text-white font-bold">Cancelar</Text>
                    </Button>
                    <Button onPress={handleSubmit(onSubmit)} className="w-48 bg-green-400">
                        <Text className="text-white font-bold text-md">Edit your informations</Text>
                    </Button>
                </View>
            </View>
        </View>
    );
}

export default ProfileForm;