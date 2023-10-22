import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'
import Home from '../screens/home';
import Login from '../screens/login';
import Profile from '../screens/profile';
import Register from '../screens/register';

const { Screen, Navigator } = createBottomTabNavigator();


export function AppTabRoutes() {
    return (
        <Navigator>
            <Screen
                name="home"
                component={Home}
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons
                            name="home"
                            color={color}
                            size={size}
                        />
                    )
                }}
            />
            <Screen
                name="profile"
                component={Profile}
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons
                            name="person"
                            color={color}
                            size={size}
                        />
                    )
                }}
            />
        </Navigator>
    );
}