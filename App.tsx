import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { NativeWindStyleSheet } from "nativewind";
import { AuthProvider } from './src/contexts/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Routes } from './src/routes';

NativeWindStyleSheet.setOutput({
    default: "native"
});

export default function App() {
    return (
        <SafeAreaView className="flex-1">
            <NavigationContainer>
                <AuthProvider>
                    <StatusBar style="auto" />
                    <Routes />
                </AuthProvider>
            </NavigationContainer>
        </SafeAreaView>
    );
}
