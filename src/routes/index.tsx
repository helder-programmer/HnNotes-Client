import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuth } from '../contexts/auth';
import { AppTabRoutes } from './appTab.routes';
import { AuthRoutes } from './auth.routes';

export function Routes() {
    const { signed } = useAuth();
    return signed ? <AppTabRoutes /> : <AuthRoutes />
}