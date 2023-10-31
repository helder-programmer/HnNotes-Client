import { MaterialIcons } from '@expo/vector-icons';
import { View, Text } from 'react-native';


import { useAuth } from "../contexts/auth";
import CustomText from "../components/customText";
import CustomView from "../components/customView";
import Button from '../components/button';
import { useTheme } from '../contexts/theme';
import ThemeSwitcher from '../components/themeSwitcher';
import GenericInformationsForm from '../components/profile/genericInformationsForm';

function Profile() {
    const { user, signOut } = useAuth();
    const { theme } = useTheme();

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

                <GenericInformationsForm />
            </View>
            <ThemeSwitcher />
        </CustomView>
    );
}

export default Profile;