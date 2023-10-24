import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuth } from '../contexts/auth';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

export function Routes() {
    const { signed } = useAuth();
    return signed ? <AppRoutes /> : <AuthRoutes />
}