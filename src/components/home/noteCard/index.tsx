import { Pressable, PressableProps, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { twMerge } from 'tailwind-merge';
import styled from "styled-components/native";

import { INote } from '../../../@types/entities';
import CustomText from '../../customText';
import { NoteService } from '../../../services/note';
import { useNotes } from '../../../contexts/notes';


interface IProps extends PressableProps {
    note: INote;
}



function NoteCard({ note, className, ...props }: IProps) {
    const noteContentWithoutHTML = note.content.replace(/<(.|\n)*?>/g, "").trim();
    const { notes, setNotes } = useNotes();

    const handleDeleteNote = async (noteId: string) => {
        try {
            await NoteService.remove(noteId);

            const noteToDeleteIndex = notes.findIndex(note => note.noteId === noteId);

            const newNotes = [...notes];

            newNotes.splice(noteToDeleteIndex, 1);

            setNotes(newNotes);


        } catch (err: any) {
            console.log(err);
        }
    }

    return (
        <Pressable
            className={twMerge("border rounded-md px-4 py-4 h-32 flex justify-between shadow-lg border-gray-500", className)}
            {...props}
        >
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
    background-color: ${({ theme }) => theme.colors.secondary};
`;

export default StyledNoteCard;