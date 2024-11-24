import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Films from './screens/Films';
import FilmDetails from './screens/FilmDetails';
import Favorites from './screens/Favorites';
import Search from './screens/SearchBar';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import TvPrograms from './screens/TVPrograms';
import TVDetails from './screens/TVDetails';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Configuração da Stack Navigator para a aba "Films"
function FilmsStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="FilmsMain" component={DrawerFilms} />
            
            <Stack.Screen name="FilmDetails" component={FilmDetails} />
        </Stack.Navigator>
    );
}

function TvStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="TvMain" component={DrawerTv} />

            <Stack.Screen name="TVDetails" component={TVDetails} />
        </Stack.Navigator>
    );
}


 function DrawerFilms() {

        return (
            <Drawer.Navigator
                screenOptions={{
                    headerShown: false,
                    drawerStyle: {
                        backgroundColor: '#fff',
                    },

                }}
            >
                <Drawer.Screen name="Films" component={Films} />
                <Drawer.Screen name="Favorites" component={Favorites} />
                

            </Drawer.Navigator>
        );
}

function SearchStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Search" component={Search} />

            <Stack.Screen name="FilmDetails" component={FilmDetails} />
            <Stack.Screen name="TVDetails" component={TVDetails} />
        </Stack.Navigator>
    );
}




function DrawerTv() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    backgroundColor: '#fff',
                },

            }}
        >
            <Drawer.Screen name="Programas de TV" component={TvPrograms} />
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

                        if (route.name === 'Films') {
                            iconName = focused ? 'film' : 'film-outline';
                        }
                        else if (route.name === 'TvPrograms') {
                            iconName = focused? 'tv' : 'tv-outline';
                        }
                        else if (route.name === 'Search') {
                            iconName = focused ? 'search' : 'search-outline';
                        }
                        return <Icon name={iconName} size={size} color={color} />;
                    },
                })}
>
          
                <Tab.Screen
                    name="Films"
                    component={FilmsStack}
                    options={{
                        tabBarLabel: 'Filmes',
                    }}
                   
                />
                <Tab.Screen
                    name="TvPrograms"
                    component={TvStack}
                    options={{
                        tabBarLabel: 'Programas de TV',
                    }}

                />
        
                <Tab.Screen
                    name="Search"
                    component={SearchStack}
                    options={{
                        tabBarLabel: 'Buscar',
                    }}
                />
            </Tab.Navigator>
           
            
        </NavigationContainer>
    );
}
