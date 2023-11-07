import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text, ActivityIndicator } from 'react-native';
import * as yup from 'yup';

import { useAuth } from '../../../contexts/auth';
import Button from '../../button';
import Input from '../../input';
import CustomText from '../../customText';
import { AuthService } from '../../../services/auth';
import { useTheme } from '../../../contexts/theme';

type Inputs = {
    name: string;
    email: string;
}

const fieldsValidationSchema = yup.object().shape({
    name: yup
        .string()
        .required('Name is required!'),
    email: yup
        .string()
        .required('E-mail is required!')
        .email('Type a valid e-mail!'),
});

function GenericInformationsForm() {
    const { user, signOut } = useAuth();
    const { theme } = useTheme();

    const { register, setValue, handleSubmit, formState: { errors, isSubmitting }, getValues } = useForm({
        resolver: yupResolver(fieldsValidationSchema),
    });

    const onSubmit = async ({ name, email }: Inputs) => {
        try {

            if (user?.name === name && user.email === user.email) return;

            await AuthService.update({ name, email });
            alert('Your informations are modified. Please, make your login for more security!');
            await signOut();
        } catch (err: any) {
            console.log(err);
            alert(err);
        }
    }

    useEffect(() => {
        if (user) {
            setValue('name', user.name);
            setValue('email', user.email);
        }
    }, [user]);

    return (
        <View className="w-full">
            <View className="space-y-3">
                <CustomText className="text-lg">Generic Informations</CustomText>
                <Input
                    defaultValue={user?.name}
                    placeholder="Name"
                    onChangeText={text => setValue('name', text)}
                    error={!!errors.name}
                    errorText={errors.name?.message}
                    fullWidth
                />
                <Input
                    defaultValue={user?.email}
                    placeholder="E-mail"
                    onChangeText={text => setValue('email', text)}                    
                    error={!!errors.email}
                    errorText={errors.email?.message}
                    fullWidth
                />
            </View>
            <View className="flex flex-row w-full justify-between mt-3">
                <Button onPress={handleSubmit(onSubmit)} fullWidth className="bg-teal-600">
                    {
                        isSubmitting
                            ?
                            <ActivityIndicator size="small" color="#FFFFFF" />
                            :
                            <Text className="text-white font-bold text-md">Edit your informations</Text>
                    }
                </Button>
            </View>
        </View>
    );
}

export default GenericInformationsForm;