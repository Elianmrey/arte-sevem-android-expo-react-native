import { render, screen } from '@testing-library/react-native';
import Films from '../path/to/Films'; // Substitua pelo caminho correto do seu componente

jest.mock('../services/TMDBService.js', () => ({
  getInfo: jest.fn(() => Promise.resolve([])), // Mockando a função getInfo para retornar um array vazio
}));

jest.mock('expo-linear-gradient', () => ({
  LinearGradient: ({ children }) => children, // Mock simples para o LinearGradient
}));

jest.mock('../src/components/atomics/DraggableFilmCard.js', () => 'DraggableFilmCard');
jest.mock('../components/composite/FavoriteBar.js', () => 'FavoriteBar');
jest.mock('../src/components/atomics/AddFavoritesBar.js', () => 'AddFavoritesBar');

describe('Componente Films', () => {
  it('Renderiza o titulo', () => {
    render(<Films />);
    expect(screen.getByText('Filmes Populares')).toBeTruthy();
  });

  it('Renderiza o componente AddFavoritesBar', () => {
    const { getByText } = render(<Films />);
    expect(getByText('AddFavoritesBar')).toBeTruthy(); 
  });

  it('Renderiza o componente FavoritesBar', () => {
    const { getByText } = render(<Films />);
    expect(getByText('FavoriteBar')).toBeTruthy(); 
  });
});
