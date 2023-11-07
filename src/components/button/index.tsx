import {TouchableOpacity, TouchableOpacityProps } from "react-native";
import { twMerge } from "tailwind-merge";
import { styled } from "styled-components/native";
import { styled as styledNW } from "nativewind";


interface IProps extends TouchableOpacityProps {
    fullWidth?: boolean;
}

function Button({ className, children, fullWidth, ...props }: IProps) {
    return (
        <TouchableOpacity
            className={twMerge(
                "p-3 rounded-md items-center shadow-lg text-white font-bold border border-gray-500",
                className,
                fullWidth && 'w-full'
            )}
            {...props}
        >
            {children}
        </TouchableOpacity>
    );
}

const StyledButton = styled(Button)`
    background-color: ${({ theme }) => theme.colors.button};
`

export default styledNW(StyledButton);