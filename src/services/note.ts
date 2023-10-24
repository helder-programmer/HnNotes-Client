import { INote } from "../@types/entities";
import { Api } from "./api"

export const NoteService = {
    create: async (title: string) => {
        const response = await Api.post<INote>('/notes', { title });
        return response.data;
    },
    getAll: async () => {
        const response = await Api.get<INote[]>('/notes');
        return response.data;
    }
}