import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { BottomSheetTextInputProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetTextInput";

interface IProps extends BottomSheetTextInputProps {

}

function CustomBottomSheetTextInput({ style, ...props }: IProps) {
    return (
        <BottomSheetTextInput
            style={[
                {
                    borderColor: '#d9d9d9', 
                    borderWidth: 1, 
                    borderRadius: 5,
                    padding: 4,
                    width: '100%'
                },
                style
            ]}
            {...props}
        />
    );
}

export default CustomBottomSheetTextInput;