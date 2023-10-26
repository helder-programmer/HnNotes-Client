import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { BottomSheetTextInputProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetTextInput";
import { styled } from "nativewind";

interface IProps extends BottomSheetTextInputProps {

}

function CustomBottomSheetTextInput({ ...props }: IProps) {
    return (
        <BottomSheetTextInput {...props} />
    );
}

export default styled(CustomBottomSheetTextInput);