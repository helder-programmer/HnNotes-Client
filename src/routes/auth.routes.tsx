import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/login';

const { Screen, Navigator } = createNativeStackNavigator();


export function AuthRoutes() {
    return (
        <Navigator>
            <Screen
                name="login"
                options={{
                    title: 'Login',
                    headerShown: false
                }}
                component={Login}
            />
        </Navigator>
    );
}