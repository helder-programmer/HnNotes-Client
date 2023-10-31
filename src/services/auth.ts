import { IUser } from "../@types/entities";
import { Api } from "./api";


interface ICreateUserParams {
    name: string;
    email: string;
    password: string;
}

interface ILoginParams {
    email: string;
    password: string;
}

interface IUpdateParams {
    name: string;
    email: string;
}

interface IUpdatePasswordParams {
    oldPassword: string;
    newPassword: string;
}

export const AuthService = {
    create: async (data: ICreateUserParams) => {
        const response = await Api.post('/users', data);
        return response.data;
    },
    login: async (data: ILoginParams) => {
        const response = await Api.post<{ user: IUser, token: string }>('/users/login', data);
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