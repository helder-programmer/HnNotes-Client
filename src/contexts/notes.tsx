import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { INote } from "../@types/entities";

interface INotesContext {
    notes: INote[];
    setNotes: Dispatch<SetStateAction<INote[]>>;
}



const NotesContext = createContext({} as INotesContext);



export function NotesProvider({ children }: { children: React.ReactNode }) {
    const [notes, setNotes] = useState<INote[]>([]);


    return (
        <NotesContext.Provider value={{ notes, setNotes }}>
            {children}
        </NotesContext.Provider>
    );
}



export const useNotes = () => {
    const notesContext = useContext(NotesContext);
    return notesContext;
}
