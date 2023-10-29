import { MaterialIcons } from '@expo/vector-icons';
import { View, Text, Switch } from 'react-native';

import ProfileForm from "../components/profileForm";
import { useAuth } from "../contexts/auth";
import CustomText from "../components/customText";
import CustomView from "../components/customView";
import Button from '../components/button';
import { useTheme } from '../contexts/theme';
import { useState } from 'react';

function Profile() {
    const { user, signOut } = useAuth();
    const [isEnabled, setisEnabled] = useState(false);
    const { theme, handleThemeSwitch } = useTheme();

    return (
        <CustomView className="w-screen flex-1 px-4 py-3 justify-between">
            <View>
                <CustomText className="text-2xl font-bold tracking-tighter">Profile</CustomText>
                <View className="flex flex-row justify-between mb-4 items-center">
                    <CustomText className="text-lg">This is your profile, {user?.name}.</CustomText>
                    <Button
                        className="flex-row items-center gap-x-1 p-2"
                        onPress={() => signOut()}
                        style={{ backgroundColor: theme.name === 'light' ? '#FFFFFF' : 'transparent' }}
                    >
                        <MaterialIcons name="logout" size={22} color="#2563eb" />
                        <Text className="text-blue-600">Logout</Text>
                    </Button>
                </View>
                <ProfileForm />
            </View>

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

                {
                    theme.name === 'light'
                        ?
                        <MaterialIcons name="nightlight-round" size={22} />
                        :
                        <MaterialIcons name="wb-sunny" size={22} color="#f5dd4b" />
                }
            </View>
        </CustomView>
    );
}

export default Profile;