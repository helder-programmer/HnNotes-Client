import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text } from 'react-native';
import * as yup from 'yup';

import { useAuth } from '../../contexts/auth';
import Button from '../../components/button';
import Input from '../../components/input';
import CustomText from '../../components/customText';

const fieldsValidationSchema = yup.object().shape({
    name: yup
        .string()
        .required('O nome é obrigatório'),
    email: yup
        .string()
        .required('O e-mail é obrigatório')
        .email('Digite um e-mail válido'),
})

function GenericInformationsForm() {
    const { user } = useAuth();

    const { register, setValue, handleSubmit, formState: { errors }, getValues } = useForm({
        resolver: yupResolver(fieldsValidationSchema),
        defaultValues: {
            name: user!.name,
            email: user!.email
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
            <View className="flex flex-row w-full justify-between mt-3">
                <Button className="bg-red-600 w-40">
                    <Text className="text-white font-bold">Cancelar</Text>
                </Button>
                <Button onPress={handleSubmit(onSubmit)} className="w-48 bg-green-500">
                    <Text className="text-white font-bold text-md">Edit your informations</Text>
                </Button>
            </View>
        </View>
    );
}

export default GenericInformationsForm;