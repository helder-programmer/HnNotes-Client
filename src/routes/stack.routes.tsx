import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/login';
import Register from '../screens/register';

const { Screen, Navigator } = createNativeStackNavigator();


export function StackRoutes() {
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
            <Screen
                name="register"
                options={{
                    headerShown: false
                }}
                component={Register}
            />
        </Navigator>
    );
}