import 'expo-dev-client';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { NativeWindStyleSheet } from "nativewind";
import { StatusBar } from 'expo-status-bar';
import * as WebBrowser from 'expo-web-browser';

import { AuthProvider } from './src/contexts/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Routes } from './src/routes';
import { ThemeProvider } from './src/contexts/theme';
import { NotesProvider } from './src/contexts/notes';


NativeWindStyleSheet.setOutput({
    default: "native"
});

WebBrowser.maybeCompleteAuthSession();

export default function App() {

    return (
        <SafeAreaView className="flex-1">
            <NavigationContainer>
                <AuthProvider>
                    <ThemeProvider>
                        <NotesProvider>
                            <StatusBar style="dark" translucent />
                            <Routes />
                        </NotesProvider>
                    </ThemeProvider>
                </AuthProvider>
            </NavigationContainer>
        </SafeAreaView>
    );
}
