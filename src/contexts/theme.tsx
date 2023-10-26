import React, { createContext, useContext, useState } from "react";
import { ThemeProvider as ThemeProviderSC } from "styled-components/native";
import { darkTheme, lightTheme } from "../theme";


interface IThemeContext {
    theme: any;
    handleThemeSwitch(): void;
}


const ThemeContext = createContext({} as IThemeContext);


export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState(darkTheme);


    const handleThemeSwitch = () => {
        if (theme.name === 'light')
            setTheme(darkTheme);
        else
            setTheme(lightTheme);
    }


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