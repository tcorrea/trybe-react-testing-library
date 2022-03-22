import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';

describe('Teste se o topo da aplicação contém um conjunto de links.', () => {
  test('O primeiro link deve possuir o texto Home.', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });
    expect(linkHome).toBeDefined();
  });
  test('O segundo link deve possuir o texto About.', () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(linkAbout).toBeDefined();
  });
  test('O terceiro link deve possuir o texto Favorite Pokémons.', () => {
    renderWithRouter(<App />);
    const LinkFavorite = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(LinkFavorite).toBeDefined();
  });
});

describe('Teste se a aplicação é redirecionada para a página:', () => {
  test('Ao clicar no link Home direciona para /', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });
    userEvent.click(linkHome);
    expect(history.location.pathname).toBe('/');
  });
  test('Ao clicar no link About direciona para /about', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');
  });
  test('Ao clicar no link Favorite Pokémons direciona para /favorites', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    userEvent.click(linkFavorite);
    expect(history.location.pathname).toBe('/favorites');
  });
  test('Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/page-not-found');
    const notFoundText = screen.getByRole('heading', {
      name: /Page requested not found/i,
    });
    expect(notFoundText).toBeDefined();
  });
});
