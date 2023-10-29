import { INote } from "../@types/entities";
import { Api } from "./api"

interface IUpdateNoteParams {
    noteId: string;
    title?: string;
    content?: string;
}


export const NoteService = {
    create: async (title: string) => {
        const response = await Api.post<INote>('/notes', { title });
        return response.data;
    },
    getAll: async () => {
        const response = await Api.get<INote[]>('/notes');
        return response.data;
    },
    getOne: async (noteId: string) => {
        const response = await Api.get<INote>(`/notes/${noteId}`);
        return response.data;
    },
    update: async ({ noteId, ...data }: IUpdateNoteParams) => {
        const response = await Api.put<INote>(`/notes/${noteId}`, data);
        return response.data;
    },
    remove: async (noteId: string) => {
        await Api.delete(`/notes/${noteId}`);
    },
    search: async (title: string) => {
        const response = await Api.get<INote[]>(`/notes/search/?title=${title}`);
        return response.data;
    }
}