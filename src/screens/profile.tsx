import { View, Text } from "react-native";
import ProfileForm from "../components/profileForm";
import { useAuth } from "../contexts/auth";
import CustomText from "../components/customText";

function Profile() {
    const {user, signOut} = useAuth();

    return (
        <View className="w-screen min-h-screen bg-white px-4">
            <CustomText className="text-2xl font-bold">Profile</CustomText>
            <CustomText className="text-lg mb-4">This is your profile, {user?.name}.</CustomText>
            <CustomText onPress={() => signOut()}>Logout</CustomText>
            <ProfileForm />
        </View>
    );
}

export default Profile;