import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helper/renderWithRouter';
import { About } from '../components';

describe('Teste o componente <About.js />', () => {
  test('Se a página contém as informações sobre a Pokédex.', () => {
    const { container } = renderWithRouter(<About />);
    expect(container.querySelector('section')).toBeDefined();
  });
  test('Se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);
    expect(
      screen.getByRole('heading', { name: /about pokédex/i }),
    ).toBeDefined();
  });
  test('Se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { container } = renderWithRouter(<About />);
    expect(container.querySelectorAll('p').length).toBe(2);
  });
  test('Se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const EXPECTED = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imgSrcString = screen.getByRole('img').src;
    expect(imgSrcString).toBe(EXPECTED);
  });
});
