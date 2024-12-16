import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthenticationScreen from '../src/screens/AuthenticationScreen.jsx';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom'; 

import {  expect } from 'jest'




test('Renderiza o componente AuthenticationScreen corretamente', () => {
 
   it('Renderiza AuthenticationScreen corretamente', () => {
    render(<AuthenticationScreen />);
    expect(screen.getByText(/Usuário/i)).toBeInTheDocument();
    expect(screen.getByText(/Senha/i)).toBeInTheDocument();
    expect(screen.getByText(/Entrar/i)).toBeInTheDocument();
  });
});