import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from './screens/Home';
import Details from './screens/Details';
import Favorites from './screens/Favorites';
import Search from './components/atomics/SearchBar';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Configuração da Stack Navigator para a aba "Home"
function HomeStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="HomeMain" component={DrawerHome} />
            
            <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
    );
}

 function DrawerHome() {

        return (
            <Drawer.Navigator
                screenOptions={{
                    headerShown: false,
                    drawerStyle: {
                        backgroundColor: '#fff',
                    },

                }}
            >
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen name="Favorites" component={Favorites} />
                

            </Drawer.Navigator>
        );
    }



export default function AppNavigator() {
    return (
        <NavigationContainer>
            
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarStyle: { backgroundColor: 'indigo' },
                    tabBarActiveTintColor: 'orange',
                    tabBarInactiveTintColor: 'grey',
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Search') {
                            iconName = focused ? 'search' : 'search-outline';
                        }
                        return <Icon name={iconName} size={size} color={color} />;
                    },
                })}
>
          
                <Tab.Screen
                    name="Home"
                    component={HomeStack}
                    options={{
                        tabBarLabel: 'Início',
                    }}
                   
                />
        
                <Tab.Screen
                    name="Search"
                    component={Search}
                    options={{
                        tabBarLabel: 'Buscar',
                    }}
                />
            </Tab.Navigator>
           
            
        </NavigationContainer>
    );
}
