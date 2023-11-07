import { useEffect, useState } from "react";
import { Switch, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

import { useTheme } from "../../contexts/theme";

function ThemeSwitcher() {
    const [isEnabled, setisEnabled] = useState(false);
    const { theme, handleThemeSwitch } = useTheme();


    useEffect(() => {
        if (theme.name === 'dark') setisEnabled(true);
    }, [theme.name]);

    return (
        <View className="flex-row items-center self-end">
            <Switch
                onValueChange={() => {
                    handleThemeSwitch();
                    setisEnabled(state => !state);
                }}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                value={isEnabled}
            />

            <MaterialIcons name="nightlight-round" size={22} color={theme.name === 'light' ? '#333333' : '#f5dd4b'} />
        </View>
    );
}

export default ThemeSwitcher;