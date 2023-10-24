import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { INote } from "../@types/entities";
import { NoteService } from "../services/note";

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

    useEffect(() => {
        getOneNote();
    }, []);


    return (
        <View className="h-screen bg-white py-2">
            <Text className="font-bold text-2xl">Note: {currentNote.title}</Text>
        </View>
    );
}

export default Note;