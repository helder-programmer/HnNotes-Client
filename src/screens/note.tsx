import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, TextInput } from "react-native";

import { INote } from "../@types/entities";
import { NoteService } from "../services/note";
import NoteEditor from "../components/noteEditor";
import { MaterialIcons } from '@expo/vector-icons';

interface IParamsProps {
    noteId: string;
}

const timeout = 2000;
let timer: any = null;

function Note() {
    const route = useRoute();
    const [currentNote, setCurrentNote] = useState<INote>({} as INote);
    const [isLoading, setIsLoading] = useState(false);
    const { noteId } = route.params as IParamsProps;


    const getOneNote = async () => {
        const note = await NoteService.getOne(noteId);
        setCurrentNote(note);
    }

    const handleChangeContent = async (text: string) => {
        clearTimeout(timer);
        setIsLoading(true);

        setCurrentNote({ ...currentNote, content: text });

        timer = setTimeout(async () => {
            try {
                await NoteService.update({ noteId, content: text });
                setIsLoading(false);
            } catch (err: any) {
                console.log(err);
            }
        }, timeout);

    }


    useEffect(() => {
        getOneNote();
    }, [noteId]);


    return (
        <View className="h-screen bg-white py-2">
            <View className="px-4 flex flex-row justify-between items-center mb-4">
                <TextInput
                    className="text-xl"
                    value={currentNote.title}
                />

                <View className="flex items-center">
                    {
                        isLoading ?
                            <>
                                <MaterialIcons name="cloud-upload" size={20} color="blue" />
                                <Text className="text-xs text-blue-500">Saving</Text>
                            </> : <>
                                <MaterialIcons name="cloud-done" size={20} color="#22c55e" />
                                <Text className="text-xs text-green-500">Saved</Text>
                            </>
                    }
                </View>
            </View>
            <NoteEditor
                handleChange={handleChangeContent}
                content={currentNote.content}
            />
        </View>
    );
}

export default Note;