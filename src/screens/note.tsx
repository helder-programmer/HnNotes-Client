import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, TextInput } from "react-native";

import { INote } from "../@types/entities";
import { NoteService } from "../services/note";
import NoteEditor from "../components/noteEditor";
import { MaterialIcons } from '@expo/vector-icons';
import CustomView from "../components/customView";
import Input from "../components/input";
import { useNotes } from "../contexts/notes";

interface IParamsProps {
    noteId: string;
}

const timeout = 2000;
let timer: any = null;

function Note() {
    const route = useRoute();
    const [currentNote, setCurrentNote] = useState<INote>({} as INote);
    const [isLoading, setIsLoading] = useState(false);
    const { notes, setNotes } = useNotes();
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

                const updatedNoteIndex = notes.findIndex(note => note.noteId === noteId);
                const newNotes = [...notes];

                newNotes[updatedNoteIndex].content = text;

                setNotes(newNotes);

                setIsLoading(false);
            } catch (err: any) {
                console.log(err);
                alert(err);
            }
        }, timeout);

    }


    const handleChangeTitle = async (title: string) => {
        clearTimeout(timer);
        setIsLoading(true);

        setCurrentNote({ ...currentNote, title });

        timer = setTimeout(async () => {

            try {
                await NoteService.update({ noteId, title });

                const updatedNoteIndex = notes.findIndex(note => note.noteId === noteId);
                const newNotes = [...notes];

                newNotes[updatedNoteIndex].title = title;

                setNotes(newNotes);

                setIsLoading(false);

            } catch (err: any) {
                console.log(err);
                alert(err);
            }
        }, timeout);
    }

    useEffect(() => {
        getOneNote();
    }, [noteId]);


    return (
        <CustomView className="h-screen py-2">
            <View className="px-4 flex flex-row items-center justify-between mb-4">
                <View className="w-[50%]">
                    <Input
                        className="text-xl border-0 font-bold"
                        value={currentNote.title}
                        onChangeText={text => handleChangeTitle(text)}
                    />
                </View>

                <View className="flex items-center">
                    {
                        isLoading
                            ?
                            <>
                                <MaterialIcons name="cloud-upload" size={20} color="blue" />
                                <Text className="text-xs text-blue-500">Saving</Text>
                            </>
                            :
                            <>
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
        </CustomView>
    );
}

export default Note;