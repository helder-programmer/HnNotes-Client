import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetModalProvider
} from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

import Button from "../components/button";
import { NoteService } from "../services/note";
import { INote } from "../@types/entities";
import NotesList from "../components/home/notesList";
import Input from "../components/input";
import CustomBottomSheetTextInput from "../components/customBottomSheetTextInput";
import CustomText from '../components/customText';

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

        const newNotes = [note, ...notes];
        setNotes(newNotes);
        setNoteTitle('');
    }

    const handleSearchByTitle = (title: string) => {

    }

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

    const getAllNotes = async () => {
        const notes = await NoteService.getAll();
        setNotes(notes);
    }

    useEffect(() => { getAllNotes() }, []);

    return (
        <BottomSheetModalProvider>
            <View className="py-2 bg-white h-screen" id="main">

                <View id="header" className="px-4 mb-4 space-y-4">
                    <CustomText className="text-2xl font-bold">
                        Your Notes
                    </CustomText>

                    <Button
                        onPress={handlePresentModalPress}
                        className="flex-row w-32 items-center"
                    >
                        <MaterialIcons name="add" color="white" size={22} />
                        <CustomText className="text-white">
                            Create Note
                        </CustomText>
                    </Button>

                    <Input
                        placeholder="Search Note..."
                        onChangeText={text => handleSearchByTitle(text)}
                    />
                </View>

                <NotesList
                    notes={notes}
                    handleDeleteNote={handleDeleteNote}
                />
            </View>

            {/* //Modal */}
            <BottomSheetModal
                backdropComponent={BottomSheetBackdrop}
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
            >
                <View id="bottom-modal-content" className="px-4 space-y-4">
                    <CustomText className="text-xl">
                        Criar Nota
                    </CustomText>
                    <View>
                        <CustomBottomSheetTextInput
                            value={noteTitle}
                            onChangeText={text => setNoteTitle(text)}
                            placeholder="Title..."
                            className="border p-2 text-lg rounded-lg border-gray-400"
                        />
                    </View>
                    <Button onPress={handleCreateNote}>
                        <CustomText className="text-white">Create Note</CustomText>
                    </Button>

                </View>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
}

export default gestureHandlerRootHOC(Home);