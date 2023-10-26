import { FlatList, ListRenderItem, Dimensions, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { INote } from '../../../@types/entities';
import NoteCard from '../noteCard';

interface IProps {
    notes: INote[];
    handleDeleteNote(noteId: string): Promise<void>;
}

const DEVICE_HEIGHT = Dimensions.get('screen').height;

function NotesList({ notes, handleDeleteNote }: IProps) {
    const listHeight = DEVICE_HEIGHT - 365;
    const navigation = useNavigation();

    const renderItem: ListRenderItem<INote> = ({ item }) => (
        <NoteCard
            note={item}
            className="mb-2"
            onPress={() => navigation.navigate('note', { noteId: item.noteId })}
            handleDeleteNote={handleDeleteNote}
        />
    );

    return (
        <View>
            <FlatList
                data={notes}
                renderItem={renderItem}
                keyExtractor={item => item.noteId}
                style={{ height: listHeight }}
                className="px-4"
            />
        </View>
    );
}

export default NotesList;