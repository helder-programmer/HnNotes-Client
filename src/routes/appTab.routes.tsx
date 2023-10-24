import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'
import Home from '../screens/home';
import Login from '../screens/login';
import Profile from '../screens/profile';
import Register from '../screens/register';
import { AppStackRoutes } from './appStack.routes';

const { Screen, Navigator } = createBottomTabNavigator();


export function AppTabRoutes() {
    return (
        <Navigator screenOptions={{
            headerTitle: 'HnNotes',
            headerStyle: {
                borderColor: '#d9d9d9',
                borderBottomWidth: 1
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                fontStyle: 'italic',                
                fontSize: 20
            }
        }}>
            <Screen
                name="home"
                component={Home}
                options={{
                    title: 'Home',
                    // headerShown: false,
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