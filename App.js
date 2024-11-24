import React from 'react';
import AppNavigator from './src/AppNavigator';
import { FavoriteProvider } from './src/context/FavoritesContext';

export default function App() {
  return (
    <FavoriteProvider>
      <AppNavigator />
    </FavoriteProvider>
  );
}
