import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import * as yup from 'yup';

import { useAuth } from '../../../contexts/auth';
import Button from '../../button';
import Input from '../../input';
import CustomText from '../../customText';
import { AuthService } from '../../../services/auth';

type Inputs = {
    oldPassword: string;
    newPassword: string;
}

const fieldsValidationSchema = yup.object().shape({
    oldPassword: yup
        .string()
        .required('Old Password is required'),
    newPassword: yup
        .string()
        .required('New Password is required')
});

function PasswordForm() {
    const { signOut } = useAuth();
    const { register, setValue, handleSubmit, formState: { errors, isSubmitting }, getValues } = useForm({
        resolver: yupResolver(fieldsValidationSchema),
    });
    const [error, setError] = useState('');

    const onSubmit = async ({ oldPassword, newPassword }: Inputs) => {
        try {
            await AuthService.updatePassword({ oldPassword, newPassword });
            alert('Your informations are modified. Please, make your login for more security!');
            await signOut();
        } catch (err: any) {
            console.log(err);
            if (err.response)
                setError(err.response.data.message);
        }
    }

    useEffect(() => {
        register('oldPassword');
        register('newPassword');
    }, [register]);

    return (
        <KeyboardAvoidingView className="w-full mt-4 space-y-3">
            <View className="space-y-3">
                <CustomText className="text-lg">Your Password</CustomText>
                <Input
                    placeholder="Old Password"
                    onChangeText={text => setValue('oldPassword', text)}
                    value={getValues('oldPassword')}
                    error={!!errors.oldPassword}
                    errorText={errors.oldPassword?.message}
                    secureTextEntry
                    fullWidth
                />
                <Input
                    placeholder="New Password"
                    onChangeText={text => setValue('newPassword', text)}
                    value={getValues('newPassword')}
                    error={!!errors.newPassword}
                    errorText={errors.newPassword?.message}
                    secureTextEntry
                    fullWidth
                />
            </View>
            <View className="flex w-full">
                <Button onPress={handleSubmit(onSubmit)} fullWidth className="bg-teal-800">
                    {
                        isSubmitting
                            ?
                            <ActivityIndicator size="small" color="#FFFFFF" />
                            :
                            <Text className="text-white font-bold text-md">Edit your password</Text>
                    }
                </Button>
                {
                    error && <Text className="text-xs text-red-500 mt-2">Error: {error}</Text>
                }
            </View>
        </KeyboardAvoidingView>
    );
}

export default PasswordForm;