import { Pressable, PressableProps } from "react-native";
import { twMerge } from "tailwind-merge";


interface IProps extends PressableProps {

}

function Button({ className, children, ...props }: PressableProps) {
    return (
        <Pressable
            className={twMerge("p-3 bg-blue-500 w-full rounded-md items-center shadow-lg text-white font-bold", className)}
            {...props}
        >
            {children}
        </Pressable>
    );
}

export default Button;