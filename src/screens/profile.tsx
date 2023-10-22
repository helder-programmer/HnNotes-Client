import { View, Text } from "react-native";
import ProfileForm from "../components/profileForm";
import { useAuth } from "../contexts/auth";

function Profile() {
    const {user} = useAuth();

    return (
        <View className="w-screen min-h-screen bg-white px-4">
            <Text className="text-2xl font-bold mb-2">Profile</Text>
            <Text className="text-lg mb-12">This is your profile, {user?.name}.</Text>
            <ProfileForm />
        </View>
    );
}

export default Profile;