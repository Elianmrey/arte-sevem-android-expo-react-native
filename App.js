import React from 'react';
import AppNavigator from './src/AppNavigator.js';
import { FavoriteProvider } from './src/context/FavoritesContext.js';

export default function App() {
  return (
    <FavoriteProvider>
      <AppNavigator />
    </FavoriteProvider>
  );
}
