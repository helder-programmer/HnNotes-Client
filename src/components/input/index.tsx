import { TextInput, TextInputProps, View, Text } from "react-native";
import { twMerge } from "tailwind-merge";

interface IProps extends TextInputProps {
    error?: boolean;
    errorText?: string
}


function Input({ error = false, className, errorText, ...props }: IProps) {
    return (
        <View className="w-full">
            <TextInput
                className={twMerge(`w-full p-2 border rounded-md border-gray-400 focus:border-sky-600 ${error && 'border-red-500'}`, className)}
                placeholderTextColor="#333"
                {...props}
            />
            {
                error &&
                <Text className="text-xs text-red-500 mt-1">{errorText}</Text>
            }
        </View>
    );
}

export default Input;