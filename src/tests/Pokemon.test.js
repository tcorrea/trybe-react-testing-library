import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  const POKEMON_NAME_TEST_ID = 'pokemon-name';

  test('Se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);
    // O nome correto do Pokémon deve ser mostrado na tela;
    expect(screen.getByTestId(POKEMON_NAME_TEST_ID).innerHTML).toBe('Pikachu');

    // O tipo correto do pokémon deve ser mostrado na tela.
    const typeButton = screen.getByRole('button', { name: /electric/i });
    userEvent.click(typeButton);
    expect(screen.getByTestId('pokemon-type').innerHTML).toBe('Electric');

    // O peso médio do pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são, respectivamente, o peso médio do pokémon e sua unidade de medida.
    // const pokemonWeight = screen.getByTestId('pokemon-weight').innerHTML;
    expect(screen.getByText(/Average weight:/i)).toBeInTheDocument();

    //    A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto <name> sprite, onde <name> é o nome do pokémon;
    const pokemonImage = screen.getByRole('img');
    expect(pokemonImage.src).toBe(
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
    const pokemon = screen.getByTestId(POKEMON_NAME_TEST_ID).innerHTML;
    expect(pokemonImage.alt).toBe(`${pokemon} sprite`);
  });

  test('Se o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
    const { history } = renderWithRouter(<App />);

    // Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido;
    const pokemonLinkDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(pokemonLinkDetails.href.includes('/pokemons/')).toBe(true);
    const pathBeforeClick = history.location.pathname;
    userEvent.click(pokemonLinkDetails);

    const pathAfterClick = history.location.pathname;
    expect(pathBeforeClick).not.toBe(pathAfterClick);

    expect(pathAfterClick.includes('/pokemons/')).toBe(true);
  });

  test('Se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: /more details/i }));

    userEvent.click(screen.getByRole('checkbox'));

    userEvent.click(screen.getByRole('link', { name: /favorite pokémons/i }));

    const pokemon = screen.getByTestId(POKEMON_NAME_TEST_ID);

    const favoriteIcon = screen.getAllByRole('img')[1];
    expect(favoriteIcon.alt).toBe(`${pokemon.innerHTML} is marked as favorite`);

    expect(favoriteIcon.src.includes('/star-icon.svg')).toBe(true);
  });
});
