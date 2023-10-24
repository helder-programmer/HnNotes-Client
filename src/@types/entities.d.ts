export interface IUser {
    userId: string;
    name: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    notes?: INote[];
}


export interface INote {
    noteId: string;
    title: string;
    content: string;
    createAt: Date;
    updatedAt: Date;
    user?: IUser;
}