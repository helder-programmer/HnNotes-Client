import { Pressable, PressableProps, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { twMerge } from 'tailwind-merge';
import styled from "styled-components/native";

import { INote } from '../../../@types/entities';
import CustomText from '../../customText';


interface IProps extends PressableProps {
    note: INote;
    handleDeleteNote(noteId: string): Promise<void>;
}



function NoteCard({ note, className, handleDeleteNote, ...props }: IProps) {
    const noteContentWithoutHTML = note.content.replace(/<(.|\n)*?>/g, "").trim();

    return (
        <Pressable className={twMerge("border rounded-md px-4 py-4 h-32 flex justify-between shadow-blue shadow-lg", className)} {...props}>
            <View className="flex flex-row items-center justify-between">
                <CustomText className="text-lg font-bold">{note.title}</CustomText>
                <FontAwesome5
                    name="trash"
                    size={18}
                    color="red"
                    onPress={() => handleDeleteNote(note.noteId)}
                />
            </View>

            <CustomText className="text-zinc-400">{noteContentWithoutHTML.substring(0, 100)}...</CustomText>
            <CustomText className="text-xs">Criada em: {new Date(note.createdAt).toLocaleDateString()}</CustomText>
        </Pressable>
    );
}

const StyledNoteCard = styled(NoteCard)`
    border-color: #d9d9d9;
    background-color: ${({theme}) => theme.colors.secondary};
`;

export default StyledNoteCard;