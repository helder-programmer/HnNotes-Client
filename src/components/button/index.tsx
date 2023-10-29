import { Pressable, PressableProps } from "react-native";
import { twMerge } from "tailwind-merge";
import { styled } from "styled-components/native";
import { styled as styledNW } from "nativewind";


interface IProps extends PressableProps {
    fullWidth?: boolean;
}

function Button({ className, children, fullWidth, ...props }: IProps) {
    return (
        <Pressable
            className={twMerge(
                "p-3 rounded-md items-center shadow-lg text-white font-bold border border-gray-500",
                className,
                fullWidth && 'w-full'
            )}
            {...props}
        >
            {children}
        </Pressable>
    );
}

const StyledButton = styled(Button)`
    background-color: ${({ theme }) => theme.colors.button};
`

export default styledNW(StyledButton);