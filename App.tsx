import { StatusBar } from 'expo-status-bar';
import { NativeWindStyleSheet } from "nativewind";
import { Routes } from './src/routes';
import { AuthProvider } from './src/contexts/auth';

NativeWindStyleSheet.setOutput({
    default: "native"
});

export default function App() {
    return (
        <AuthProvider>
            <Routes />
        </AuthProvider>
    );
}
