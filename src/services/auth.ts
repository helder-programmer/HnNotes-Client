import { IUser } from "../@types/entities";
import { Api } from "./api";

interface ILoginOrCreateParams {
    googleId: string;
    email: string;
    name: string;
    picture: string;
}

interface IUpdateParams {
    name: string;
}

interface IUpdatePasswordParams {
    oldPassword: string;
    newPassword: string;
}

export const AuthService = {
    loginOrCreate: async (data: ILoginOrCreateParams) => {
        const response = await Api.post<{ user: IUser, token: string }>('/users', data);
        return response.data;
    },
    recoverUserInformations: async () => {
        const response = await Api.get<IUser>('/users/me');
        return response.data;
    },
    update: async (data: IUpdateParams) => {
        const response = await Api.put<IUser>('/users/', data);
        return response.data;
    },
    updatePassword: async (data: IUpdatePasswordParams) => {
        const response = await Api.put('/users/password', data);
        return response.data;
    }
}