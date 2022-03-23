import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helper/renderWithRouter';
import { NotFound } from '../components';

describe('Teste o componente <NotFound.js />', () => {
  test('Se página contém um heading h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);
    expect(
      screen.getByRole('heading', {
        name: /Page requested not found/i,
        level: 2,
      }),
    ).toBeDefined();
  });
  test('Se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);
    const EXPECTED = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imgSrcString = screen.getAllByRole('img')[1].src;
    expect(imgSrcString).toBe(EXPECTED);
  });
});
