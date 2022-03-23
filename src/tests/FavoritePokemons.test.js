import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Teste o componente <FavoritePokemons.js />', () => {
  const classTarget = '.favorite-pokemons';

  test('Se  No favorite pokemon found, se a pessoa não tiver pokémons favoritos', () => {
    const { container } = renderWithRouter(<FavoritePokemons />);

    expect(container.querySelectorAll(classTarget).length).toBe(0);

    expect(container.querySelector('p').innerHTML).toBe(
      'No favorite pokemon found',
    );
  });
  test('Se é exibido todos os cards de pokémons favoritados.', () => {
    // render app
    const { container, history } = renderWithRouter(<App />);
    // clicar em more details
    userEvent.click(screen.getByRole('link', { name: /more details/i }));
    console.log('details: ', history.location.pathname);
    // clicar em favoritar pokemon
    userEvent.click(screen.getByRole('checkbox'));
    // ir para página favorite pokemon
    history.push('/favorites');
    // varificar se tem pokemon
    expect(container.querySelectorAll(classTarget).length).toBeGreaterThan(0);
  });
});
