import { FlatList, ListRenderItem, Dimensions, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

import { INote } from '../../../@types/entities';
import NoteCard from '../noteCard';
import { useNotes } from '../../../contexts/notes';

const DEVICE_HEIGHT = Dimensions.get('screen').height;

function NotesList() {
    const listHeight = DEVICE_HEIGHT - 365;
    const navigation = useNavigation();
    const { notes, setNotes } = useNotes();

    const renderItem: ListRenderItem<INote> = ({ item }) => (
        <NoteCard
            note={item}
            className="mb-2"
            onPress={() => navigation.navigate('note', { noteId: item.noteId })}
            key={item.noteId}
        />
    );

    return (
        <Animatable.View animation="fadeInUp">
            <FlatList
                data={notes}
                renderItem={renderItem}
                keyExtractor={item => item.noteId}
                style={{ height: listHeight }}
                className="px-4"
            />
        </Animatable.View>
    );
}

export default NotesList;