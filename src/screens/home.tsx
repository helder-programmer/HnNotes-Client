import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetTextInput
} from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef, useState } from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

import Button from "../components/button";
import { NoteService } from "../services/note";
import { INote } from "../@types/entities";

function Home() {
    const [noteTitle, setNoteTitle] = useState('');
    const [notes, setNotes] = useState<INote[]>([]);

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const snapPoints = useMemo(() => ['25%', '40%'], []);


    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const handleCreateNote = async () => {
        const note = await NoteService.create(noteTitle);
        bottomSheetModalRef.current?.close();
    }

    const getAllNotes = async () => {
        const notes = await NoteService.getAll();
        setNotes(notes);
    } 

    return (
        <BottomSheetModalProvider>
            <View className="px-4 py-2">
                <Text className="text-2xl font-bold mb-4">
                    Your Notes
                </Text>
                <Button
                    onPress={handlePresentModalPress}
                    className="flex-row w-32 items-center"
                >
                    <MaterialIcons name="add" color="white" size={22} />
                    <Text className="text-white">
                        Create Note
                    </Text>
                </Button>
            </View>
            <BottomSheetModal
                backdropComponent={BottomSheetBackdrop}
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
            >
                <View>
                    <Text>Awesome 🎉</Text>
                    <BottomSheetTextInput
                        style={{ borderBottomColor: 'black', borderBottomWidth: 1 }}
                        value={noteTitle}
                        onChangeText={text => setNoteTitle(text)}
                    />
                    <Button onPress={handleCreateNote}>
                        <Text>
                            Criar Nota
                        </Text>
                    </Button>
                </View>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
}

export default gestureHandlerRootHOC(Home);