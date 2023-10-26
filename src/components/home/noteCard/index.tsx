import { Pressable, PressableProps, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { INote } from '../../../@types/entities';
import { twMerge } from 'tailwind-merge';
import CustomText from '../../customText';

interface IProps extends PressableProps {
    note: INote;
    handleDeleteNote(noteId: string): Promise<void>;
}

function NoteCard({ note, className, handleDeleteNote, ...props }: IProps) {
    const noteContentWithoutHTML = note.content.replace(/<(.|\n)*?>/g, "").trim();


    return (
        <Pressable className={twMerge("border-gray-300 border rounded-md px-4 py-4 h-32 flex justify-between bg-zinc-100 shadow-blue shadow-lg", className)} {...props}>
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

export default NoteCard;