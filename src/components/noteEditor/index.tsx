import { useRef } from "react";
import { Platform, StyleSheet, ScrollView, KeyboardAvoidingView, View, SafeAreaView, Text } from "react-native";
import { RichEditor, RichToolbar, actions } from "react-native-pell-rich-editor";
import { useTheme } from "../../contexts/theme";


const richTextActions = [
    actions.insertImage,
    actions.setBold,
    actions.setItalic,
    actions.insertBulletsList,
    actions.insertOrderedList,
    actions.insertLink,
    actions.setStrikethrough,
    actions.setUnderline,
    actions.heading1,
    actions.heading2,
    actions.heading3,
];


interface IProps {
    handleChange(text: string): void;
    content: string;
}

function NoteEditor({ handleChange, content }: IProps) {
    const { theme } = useTheme();
    const richTextRef = useRef<RichEditor>(null);

    const styles = StyleSheet.create({
        editor: {
            backgroundColor: theme.colors.secondary,
            color: theme.colors.text,
            marginBottom: 10
        }
    });

    return (
        <SafeAreaView>
            <RichToolbar
                editor={richTextRef}
                actions={richTextActions}
                iconMap={{
                    [actions.heading1]: ({ tintColor }: any) => (<Text style={[{ color: tintColor }]}>H1</Text>),
                    [actions.heading2]: ({ tintColor }: any) => (<Text style={[{ color: tintColor }]}>H2</Text>),
                    [actions.heading3]: ({ tintColor }: any) => (<Text style={[{ color: tintColor }]}>H3</Text>),
                    [actions.heading4]: ({ tintColor }: any) => (<Text style={[{ color: tintColor }]}>H4</Text>),
                }}
            />
            <ScrollView className="h-[40%]">
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                    <RichEditor
                        ref={richTextRef}
                        editorStyle={styles.editor}
                        initialContentHTML={content}
                        onChange={handleChange}  
                        initialHeight={250}             
                    />
                </KeyboardAvoidingView>
            </ScrollView>

        </SafeAreaView>
    );
}

export default NoteEditor;