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

function Note() {
    const route = useRoute();
    const [currentNote, setCurrentNote] = useState<INote>({} as INote);
    const { noteId } = route.params as IParamsProps;


    const getOneNote = async () => {
        const note = await NoteService.getOne(noteId);
        setCurrentNote(note);
    }

    const handleChangeContent = async (text: string) => {
        setCurrentNote({ ...currentNote, content: text });
    }


    useEffect(() => {
        getOneNote();
    }, []);


    return (
        <View className="h-screen bg-white py-2">
            <View className="px-4 flex flex-row justify-between items-center mb-4">
                <TextInput
                    className="text-xl"
                    value={currentNote.title}
                />

                <View className="flex items-center">
                    <MaterialIcons name="cloud" size={22} color="#22c55e" />
                    <Text className="text-xs text-green-500">Saved</Text>
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