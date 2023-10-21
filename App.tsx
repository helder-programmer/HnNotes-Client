import { StatusBar } from 'expo-status-bar';
import { NativeWindStyleSheet } from "nativewind";
import { Routes } from './src/routes';

NativeWindStyleSheet.setOutput({
    default: "native"
});

export default function App() {
    return (
        <Routes />
    );
}
