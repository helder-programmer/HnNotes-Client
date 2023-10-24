import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/login';
import Register from '../screens/register';
import home from '../screens/home';

const { Screen, Navigator } = createNativeStackNavigator();


export function AppStackRoutes() {
    return (
        <Navigator>
            <Screen
                name="note"
               component={home} 
            />
        </Navigator>
    );
}