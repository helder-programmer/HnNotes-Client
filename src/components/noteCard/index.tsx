import { View, Text, ViewProps } from 'react-native';

import { INote } from '../../@types/entities';
import { twMerge } from 'tailwind-merge';
import CustomText from '../customText';

interface IProps extends ViewProps {
    note: INote;
}

function NoteCard({ note, className, ...props }: IProps) {
    return (
        <View className={twMerge("border-gray-300 border rounded-md px-4 py-4 h-32 flex justify-between bg-zinc-100 shadow-blue shadow-lg", className)} {...props}>
            <CustomText className="text-lg font-bold">{note.title}</CustomText>
            <CustomText className="text-zinc-400">{note.content.substring(0, 70)}...</CustomText>
            <CustomText className="text-xs">Criada em: {new Date(note.createdAt).toLocaleDateString()}</CustomText>
        </View>
    );
}

export default NoteCard;