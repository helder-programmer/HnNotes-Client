import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { NativeWindStyleSheet } from "nativewind";
import { AuthProvider } from './src/contexts/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Routes } from './src/routes';
import { ThemeProvider } from './src/contexts/theme';


NativeWindStyleSheet.setOutput({
    default: "native"
});

export default function App() {
    return (
        <SafeAreaView className="flex-1">
            <NavigationContainer>
                <ThemeProvider>
                    <AuthProvider>
                        <StatusBar style="auto" />
                        <Routes />
                    </AuthProvider>
                </ThemeProvider>
            </NavigationContainer>
        </SafeAreaView>
    );
}
