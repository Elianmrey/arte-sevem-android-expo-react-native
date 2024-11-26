import React from 'react';
import { render } from '@testing-library/react-native';
import StarsRating from '../components/atomics/StarsRating.js';

describe('StarsRating Component', () => {
    it('renders the correct number of filled and empty stars', () => {
        const { getAllByText, getByText } = render(<StarsRating rating={7.5} />);

        // Verifica a quantidade de estrelas preenchidas (4) e vazias (1) com base no cálculo
        expect(getAllByText('★').length).toBe(4);
        expect(getAllByText('☆').length).toBe(1);

        // Verifica se o texto da nota é exibido corretamente
        expect(getByText('7.5')).toBeTruthy();
    });

    it('renders no stars for zero rating', () => {
        const { getAllByText, getByText } = render(<StarsRating rating={0} />);

        // Nenhuma estrela cheia
        expect(getAllByText('★').length).toBe(0);
        // Todas as estrelas vazias
        expect(getAllByText('☆').length).toBe(5);

        // Verifica se o texto da nota é exibido como 0.0
        expect(getByText('0.0')).toBeTruthy();
    });

    it('renders all filled stars for maximum rating', () => {
        const { getAllByText, getByText } = render(<StarsRating rating={10} />);

        // Todas as estrelas preenchidas
        expect(getAllByText('★').length).toBe(5);
        // Nenhuma estrela vazia
        expect(getAllByText('☆').length).toBe(0);

        // Verifica se o texto da nota é exibido como 10.0
        expect(getByText('10.0')).toBeTruthy();
    });
});
