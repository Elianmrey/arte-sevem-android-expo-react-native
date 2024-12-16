import React from 'react';
import { render, screen } from '@testing-library/react-native';
import Details from '../src/screens/FilmDetails.js';

jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(() => ({
    params: {
      movie: {
        title: 'Titulo de Filme',
        release_date: '2010-07-16',
        vote_average: 8.8,
        poster_path: '/poster.jpg',
        backdrop_path: '/backdrop.jpg',
        overview: 'Texto para teste do componente de detalhes.',
      },
    },
  })),
}));

jest.mock('expo-linear-gradient', () => ({
  LinearGradient: ({ children }) => children, 
}));

jest.mock('../src/components/atomics/StarsRating.js', () => ({ rating }) => (
  <Text>{`Rating: ${rating}`}</Text>
));

describe('Detalhes ', () => {
  it('Renderiza o componente e testa os titulo do filme', () => {
    render(<Details />);
    expect(screen.getByText('Titulo de Filme')).toBeTruthy();
  });

  it('Renderiza o componente e testa a data de lançamento', () => {
    render(<Details />);
    expect(screen.getByText('Lançamento: 2010-07-16')).toBeTruthy();
  });

  it('Renderiza o componente e testa a sinopse', () => {
    render(<Details />);
    expect(
      screen.getByText('Texto para teste do componente de detalhes.')
    ).toBeTruthy();
  });

  it('Renderiza o componente e testa a avaliação', () => {
    render(<Details />);
    expect(screen.getByText('Rating: 8.8')).toBeTruthy();
  });
});
