import { TextInput, TextInputProps, View, Text } from "react-native";
import { twMerge } from "tailwind-merge";
import { useTheme } from "../../contexts/theme";

interface IProps extends TextInputProps {
    error?: boolean;
    errorText?: string
}


function Input({ error = false, className, errorText, ...props }: IProps) {
    const { theme } = useTheme();
    const styledClass = `${theme.name === 'light' ? 'border-gray-400 focus:border-sky-600' : 'border-gray-400 focus:border-sky-600 text-white'}`;

    return (
        <View className="w-full">
            <TextInput
                className={twMerge(`w-full p-2 border rounded-md ${error && 'border-red-500'}`, className, styledClass)}
                placeholderTextColor={theme.name === 'light' ? '#333' : '#D9D9D9'}
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