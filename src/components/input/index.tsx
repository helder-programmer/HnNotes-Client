import { TextInput, TextInputProps, View, Text } from "react-native";

interface IProps extends TextInputProps {
    error?: boolean;
    errorText?: string
}


function Input({ error = false, errorText, ...props }: IProps) {
    return (
        <View className="w-full">
            <TextInput
                className={`w-full p-2 border rounded-md border-gray-400 focus:border-sky-600 ${error && 'border-red-500'}`}
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