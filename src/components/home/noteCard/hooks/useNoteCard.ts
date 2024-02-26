import { useNotes } from "../../../../contexts/notes";
import { NoteService } from "../../../../services/note";

export function useNoteCard() {
    const { notes, setNotes } = useNotes();

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

    return {
        handleDeleteNote
    }

}