import React from 'react';
import { render, screen } from '@testing-library/react-native';
import Details from '../src/screens/TVDetails.js'; 

jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(() => ({
    params: {
      tvProgram: {
        original_name: 'Programa de TV',
        first_air_date: '2008-01-20',
        overview: 'Texto para teste do componente de detalhes.',
      },
    },
  })),
}));

jest.mock('expo-linear-gradient', () => ({
  LinearGradient: ({ children }) => children, 
}));

describe('Componente Details de TV', () => {
  it('Renderiza os detalhes de um programa de TV', () => {
    render(<Details />);
    expect(screen.getByText('Programa de TV')).toBeTruthy();
    expect(screen.getByText('Lançamento: 2008-01-20')).toBeTruthy();
    expect(
      screen.getByText('Texto para teste do componente de detalhes.')
    ).toBeTruthy();
  });
});
