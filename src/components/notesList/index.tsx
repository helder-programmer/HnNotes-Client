import { FlatList, ListRenderItem, Dimensions, View } from 'react-native';

import { INote } from '../../@types/entities';
import NoteCard from '../noteCard';

interface IProps {
    notes: INote[];
}

const DEVICE_HEIGHT = Dimensions.get('screen').height;

function NotesList({ notes }: IProps) {
    const listHeight = DEVICE_HEIGHT - 365;

    const renderItem: ListRenderItem<INote> = ({ item }) => <NoteCard note={item} className="mb-2" />;

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