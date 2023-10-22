import { View, Text } from "react-native";
import CreateNoteForm from "../components/createNoteForm";

function Home() {
    return (
        <View className="w-screen min-h-screen bg-white px-4">
            <Text className="text-2xl font-bold mb-8">Your Notes</Text>
            <CreateNoteForm />
        </View>
    );
}

export default Home;