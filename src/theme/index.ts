
export interface ITheme {
    name: 'light' | 'dark';
    colors: {
        primary: string,
        secondary: string,
        text: string;
        button: string;
    }
};

export const lightTheme: ITheme = {
    name: 'light',
    colors: {
        primary: '#FFFFFF',
        secondary: '#f9fafb',
        text: '#333333',
        button: '#2563eb'
    }
};


export const darkTheme: ITheme = {
    name: 'dark',
    colors: {
        primary: '#0f172a',
        secondary: '#1e293b',
        text: '#FFFFFF',
        button: '#1e293b'
    }
};