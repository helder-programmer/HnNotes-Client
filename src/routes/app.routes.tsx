import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'
import Home from '../screens/home';
import Profile from '../screens/profile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Note from '../screens/note';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();


function AppTabRoutes() {
    return (
        <Tab.Navigator screenOptions={{
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
            <Tab.Screen
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
            <Tab.Screen
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
        </Tab.Navigator>
    );
}


export function AppRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name="root"
                component={AppTabRoutes}
            />
            <Stack.Screen
                name="note"
                component={Note}
            />

        </Stack.Navigator>
    );
}