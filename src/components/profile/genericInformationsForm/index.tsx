import { View, Text, ActivityIndicator } from 'react-native';
import Button from '../../button';
import Input from '../../input';
import CustomText from '../../customText';
import { useGenericInformationsForm } from './hooks/useGenericInformationsForm';
import { useAuth } from '../../../contexts/auth';

function GenericInformationsForm() {
    const {
        errors,
        isSubmitting,
        getValues,
        handleSubmit,
        register,
        setValue
    } = useGenericInformationsForm();
    const { user } = useAuth();

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
            </View>
            <View className="flex flex-row w-full justify-between mt-3">
                <Button
                    onPress={handleSubmit}
                    fullWidth
                    className="bg-teal-600"
                    disabled={isSubmitting}
                >
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