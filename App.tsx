import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeWindStyleSheet } from "nativewind";
import Login from './src/screens/login';

NativeWindStyleSheet.setOutput({
    default: "native"
});

export default function App() {
    return (
        <>
            <Login />
            <StatusBar style="auto" />
        </>
    );
}
