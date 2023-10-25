import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import { RichEditor, RichToolbar, actions } from "react-native-pell-rich-editor";


const richTextActions = [
    actions.insertImage,
    actions.setBold,
    actions.setItalic,
    actions.insertBulletsList,
    actions.insertOrderedList,
    actions.insertLink,
    actions.setStrikethrough,
    actions.setUnderline,
];


interface IProps {
    handleChange(text: string): void;
    content: string;
}

function NoteEditor({ handleChange, content }: IProps) {
    const richTextRef = useRef<RichEditor>(null);

    return (
        <View>
            <RichToolbar
                editor={richTextRef}
                actions={richTextActions}
                selectedIconTint="#873c1e"
                iconTint="#312921"
            />
            <RichEditor
                ref={richTextRef}
                placeholder="Enter your text..."
                initialHeight={250}
                onChange={handleChange}
                initialContentHTML={content}
            />
        </View>
    );
}

export default NoteEditor;