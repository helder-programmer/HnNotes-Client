import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as ThemeProviderSC } from "styled-components/native";
import { darkTheme, ITheme, lightTheme } from "../theme";
import * as SecureStore from 'expo-secure-store';


interface IThemeContext {
    theme: ITheme;
    handleThemeSwitch(): void;
}


const ThemeContext = createContext({} as IThemeContext);


export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState(lightTheme);

    const getTheme = async () => {
        const currentTheme = await SecureStore.getItemAsync('hn-theme');


        const currentParsedTheme = JSON.parse(String(currentTheme));
        setTheme(currentParsedTheme);

    }



    const handleThemeSwitch = async () => {
        try {

            if (theme.name === 'light')
                setTheme(darkTheme);
            else
                setTheme(lightTheme);

            await SecureStore.setItemAsync('hn-theme', JSON.stringify(theme));
        } catch (err: any) {
            alert(err);
        }
    }

    useEffect(() => {
        getTheme();
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, handleThemeSwitch }}>
            <ThemeProviderSC theme={theme}>
                {children}
            </ThemeProviderSC>
        </ThemeContext.Provider>
    );

}



export const useTheme = () => {
    const themeContext = useContext(ThemeContext);
    return themeContext;
}