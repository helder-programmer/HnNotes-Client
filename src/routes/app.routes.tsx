import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'
import Home from '../screens/home';
import Profile from '../screens/profile';
import Note from '../screens/note';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../contexts/theme';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();


function AppTabRoutes() {
    const { theme } = useTheme();

    return (
        <Tab.Navigator screenOptions={{
            headerTitle: 'HnNotes',
            headerStyle: {
                borderColor: '#d9d9d9',
                borderBottomWidth: 1,
                backgroundColor: theme.colors.secondary
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                fontStyle: 'italic',
                color: theme.colors.text,
                fontSize: 20
            },
            tabBarStyle: {
                backgroundColor: theme.colors.secondary
            }
        }}>
            <Tab.Screen
                name="home"
                component={Home}
                options={{
                    title: 'Home',
                    tabBarIcon: ({ size }) => (
                        <MaterialIcons
                            name="home"
                            color={theme.colors.text}
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
                    tabBarIcon: ({ size }) => (
                        <MaterialIcons
                            name="person"
                            color={theme.colors.text}
                            size={size}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    );
}


export function AppRoutes() {
    const { theme } = useTheme();

    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="root"
                component={AppTabRoutes}
            />
            <Stack.Screen
                name="note"
                component={Note}
                options={{
                    title: 'Update Note',
                    headerStyle: {                                                                        
                        backgroundColor: theme.colors.secondary
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        color: theme.colors.text,
                        fontSize: 20
                    },                 
                    headerTintColor: theme.colors.text                       
                }}
            />

        </Stack.Navigator>
    );
}