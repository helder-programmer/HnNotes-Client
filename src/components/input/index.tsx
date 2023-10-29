import { TextInput, TextInputProps, View, Text } from "react-native";
import { twMerge } from "tailwind-merge";

import { useTheme } from "../../contexts/theme";

interface IProps extends TextInputProps {
    error?: boolean;
    errorText?: string;
    fullWidth?: boolean;
}


function Input({ error = false, className, errorText, fullWidth, ...props }: IProps) {
    const { theme } = useTheme();

    const themeClass = `${theme.name === 'light' ? 'text-[#333333] focus:border-blue-600' : 'text-[#FFFFFF] focus:border-[#FFFFFF]'}`

    return (
        <View className="w-full">
            <TextInput
                className={twMerge(
                    `${fullWidth && 'w-full'} p-2 border rounded-md border-gray-500 ${error && 'border-red-500'}`,
                    className,
                    themeClass
                )}
                placeholderTextColor={theme.name === 'light' ? '#a7a7a7' : '#D9D9D9'}
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