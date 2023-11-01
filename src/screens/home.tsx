import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetModalProvider
} from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { ActivityIndicator } from 'react-native';

import Button from "../components/button";
import { NoteService } from "../services/note";
import NotesList from "../components/home/notesList";
import Input from "../components/input";
import CustomBottomSheetTextInput from "../components/customBottomSheetTextInput";
import CustomText from '../components/customText';
import CustomView from "../components/customView";
import { useTheme } from "../contexts/theme";
import { useNotes } from "../contexts/notes";

function Home() {
    const { theme } = useTheme();
    const { notes, setNotes } = useNotes();
    const [noteTitle, setNoteTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const snapPoints = useMemo(() => ['25%', '40%'], []);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const handleCreateNote = async () => {
        try {
            setIsLoading(true);

            const note = await NoteService.create(noteTitle);
            bottomSheetModalRef.current?.close();

            const newNotes = [note, ...notes];
            setNotes(newNotes);
            setNoteTitle('');

            setIsLoading(false);
        } catch (err: any) {
            setIsLoading(false);
            console.log(err);
            alert(err);
        }
    }

    const handleSearchByTitle = async () => {
        try {
            const notes = await NoteService.search(noteTitle);
            setNotes(notes);
        } catch (err: any) {
            console.log(err);
            alert(err);
        }
    }

    const getAllNotes = async () => {
        const notes = await NoteService.getAll();
        setNotes(notes);
    }

    useEffect(() => { getAllNotes() }, []);

    return (
        <BottomSheetModalProvider>
            <CustomView className="py-3" id="main">
                <View id="header" className="px-4 mb-4 space-y-4">
                    <CustomText className="text-2xl font-bold tracking-tighter">
                        Your Notes
                    </CustomText>

                    <Button
                        onPress={handlePresentModalPress}
                        className="flex-row w-32 items-center"
                    >
                        <MaterialIcons name="add" color="white" size={22} />
                        <CustomText className="text-white mb-[2px]">
                            Create Note
                        </CustomText>
                    </Button>

                    <Input
                        placeholder="Search Note..."
                        onChangeText={text => setNoteTitle(text)}
                        onSubmitEditing={handleSearchByTitle}
                    />
                </View>

                <NotesList />
            </CustomView>

            {/* //Modal */}
            <BottomSheetModal
                backdropComponent={BottomSheetBackdrop}
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                backgroundStyle={{ backgroundColor: theme.colors.primary }}
                handleIndicatorStyle={{ backgroundColor: theme.colors.text }}
            >
                <CustomView id="bottom-modal-content" className="px-4 space-y-4 flex-1">
                    <CustomText className="text-xl">
                        Criar Nota
                    </CustomText>
                    <View>
                        <CustomBottomSheetTextInput
                            value={noteTitle}
                            onChangeText={text => setNoteTitle(text)}
                            placeholder="Title..."
                            className={`border p-2 text-lg rounded-lg border-gray-400`}
                            style={{ color: theme.colors.text }}
                            placeholderTextColor={theme.name == 'light' ? '#333333' : '#D9D9D9'}
                        />
                    </View>
                    <Button onPress={handleCreateNote}>
                        {
                            isLoading
                                ?
                                <ActivityIndicator size="small" color="#FFFFFF" />
                                :
                                <CustomText className="text-white">Create Note</CustomText>
                        }
                    </Button>
                </CustomView>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
}

export default gestureHandlerRootHOC(Home);