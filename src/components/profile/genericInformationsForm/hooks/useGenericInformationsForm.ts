import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useAuth } from '../../../../contexts/auth';
import { AuthService } from '../../../../services/auth';
import { Inputs } from '../types';
import { validationSchema } from '../schema';

export function useGenericInformationsForm() {
    const { user, signOut } = useAuth();

    const { register, setValue, handleSubmit, formState: { errors, isSubmitting }, getValues } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async ({ name }: Inputs) => {
        try {

            if (user?.name === name && user.email === user.email) return;

            await AuthService.update({ name });
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
        }
    }, [user]);


    return {
        errors,
        isSubmitting,
        register,
        getValues,
        setValue,
        handleSubmit: handleSubmit(onSubmit)
    }

}
