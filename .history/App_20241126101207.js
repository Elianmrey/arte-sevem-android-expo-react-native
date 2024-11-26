import React from 'react';
import AppNavigator from './src/AppNavigator.jsx';
import { FavoriteProvider } from './src/context/FavoritesContext.jsx';

export default function App() {
  return (
    <FavoriteProvider>
      <AppNavigator />
    </FavoriteProvider>
  );
}
