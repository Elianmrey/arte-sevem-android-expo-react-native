import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator } from '@react-navigation/drawer';


import Films from './screens/Films.js';
import FilmDetails from './screens/FilmDetails.jsx';
import Favorites from './screens/Favorites.jsx';
import Search from './screens/SearchBar.jsx';
import TvPrograms from './screens/TVPrograms.jsx';
import TVDetails from './screens/TVDetails.jsx';
import FavoriteBar from './components/composite/FavoriteBar.jsx';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Configuração da Stack Navigator para a aba "Films" (Grupo de abas de Films junto com os detalhes dos filmes e programas de TV, com os a Stack Navigator de Favoritos)
function FilmsStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="FilmsMain" component={DrawerFilms} />
            <Stack.Screen name="FilmDetails" component={FilmDetails} />
            <Stack.Screen name="TVDetails" component={TVDetails} />
            <Stack.Screen name="FavoriteBar" component={FavoriteBarStack} />
        </Stack.Navigator>
    );
}

// Configuração da Stack Navigator para a aba "TV"(Grupo de abas de TV junto com os detalhes dos filmes e programas de TV, com os a Stack Navigator de Favoritos)
function TvStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="TvMain" component={DrawerTv} />
            <Stack.Screen name="TVDetails" component={TVDetails} />
            <Stack.Screen name="FilmDetails" component={FilmDetails} />
            <Stack.Screen name="FavoriteBar" component={FavoriteBarStack} />
            
        </Stack.Navigator>
    );
}

// Configuração do Drawer Navigator para a aba Films (Links de Aba Filmes e Favoritos para Drawer Menu de Films)
 function DrawerFilms() {
        return (
            <Drawer.Navigator
                screenOptions={{
                    headerShown: false,
                    drawerStyle: {
                        backgroundColor: '#FEA900',
                    },
                    drawerActiveTintColor: '#fff',
                    drawerActiveBackgroundColor: '#ecaf99',
                }} >
                <Drawer.Screen name="Filmes" component={Films} />
                <Drawer.Screen name="Favoritos" component={FavoriteStack} />
            </Drawer.Navigator>
        );
}

// Configuração da Stack Navigator para a aba "Search" (Grupo de abas de pesquisa junto com os detalhes dos filmes e programas de TV)
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
                    backgroundColor: '#FEA900',
                },
                drawerActiveTintColor: '#fff',
                drawerActiveBackgroundColor: '#ecaf99',
            }}
        >
            <Drawer.Screen name="Programas de TV" component={TvPrograms} />
            <Drawer.Screen name="Favoritos" component={FavoriteStack} />
        </Drawer.Navigator>
    );
}

function FavoriteStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Favorites" component={Favorites} />
            <Stack.Screen name="FilmDetails" component={FilmDetails} />
            <Stack.Screen name="TVDetails" component={TVDetails} />

          
        </Stack.Navigator>
    );
}

function FavoriteBarStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="FavoriteBar" component={FavoriteBar} />           
        </Stack.Navigator>
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
                        else if (route.name === 'MainSearch') {
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
                    name="MainSearch"
                    component={SearchStack}
                    options={{
                        tabBarLabel: 'Buscar',
                    }}
                />
            </Tab.Navigator>
           
            
        </NavigationContainer>
    );
}
