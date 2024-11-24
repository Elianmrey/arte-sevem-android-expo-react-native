import React from 'react';
import { FavoriteProvider } from './context/FavoriteContext';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
    return (
        <FavoriteProvider>
            <AppNavigator />
        </FavoriteProvider>
    );
}
