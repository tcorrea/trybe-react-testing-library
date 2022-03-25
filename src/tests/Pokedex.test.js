import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
// import { Pokedex } from '../components';
import App from '../App';

describe('Teste o componente Pokedex', () => {
  const POKEMON_NAME_TEST_ID = 'pokemon-name';
  const NEXT_POKEMON_TEST_ID = 'next-pokemon';

  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    expect(
      screen.getByRole('heading', { name: /encountered pokémons/i, level: 2 }),
    ).toBeDefined();
  });

  test('Se é exibido o próximo Pokémon quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);

    const stockPokemonName = screen.getByTestId(POKEMON_NAME_TEST_ID).innerHTML;

    userEvent.click(screen.getByTestId(NEXT_POKEMON_TEST_ID));

    const currentPokemonName = screen.getByTestId(POKEMON_NAME_TEST_ID).innerHTML;
    expect(stockPokemonName).not.toBe(currentPokemonName);
  });

  test('O botão deve conter o texto Próximo pokémon', () => {
    renderWithRouter(<App />);

    expect(screen.getByTestId(NEXT_POKEMON_TEST_ID).innerHTML).toBe(
      'Próximo pokémon',
    );
  });

  test('Pokémons devem ser mostrados, ao clicar sucessivamente no botão', () => {
    renderWithRouter(<App />);

    let result = false;
    let prev = screen.getByTestId(POKEMON_NAME_TEST_ID).innerHTML;
    const nextButton = screen.getByTestId(NEXT_POKEMON_TEST_ID);
    const CLICKS = 10;

    // Da para fazer com reduce?
    for (let index = 0; index < CLICKS; index += 1) {
      userEvent.click(nextButton);
      const current = screen.getByTestId(POKEMON_NAME_TEST_ID).innerHTML;
      if (prev === current) {
        result = false;
        break;
      } else {
        result = true;
        prev = current;
      }
    }
    expect(result).toBe(true);
  });

  test('Se estiver no último Pokémon da lista, ao clicar, mostrar o primeiro', () => {
    renderWithRouter(<App />);

    const firstPokemon = screen.getByTestId(POKEMON_NAME_TEST_ID);
    let currentPokemon = firstPokemon.innerHTML;
    const nextButton = screen.getByTestId(NEXT_POKEMON_TEST_ID);

    while (currentPokemon !== 'Dragonair') {
      userEvent.click(nextButton);
      currentPokemon = screen.getByTestId(POKEMON_NAME_TEST_ID).innerHTML;
    }

    userEvent.click(nextButton);
    currentPokemon = screen.getByTestId(POKEMON_NAME_TEST_ID);
    expect(currentPokemon).toBe(firstPokemon);
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    expect(screen.getAllByTestId(POKEMON_NAME_TEST_ID).length).toBe(1);
  });

  test('Somente um botão de filtragem para cada tipo de Pokémon, sem repetição', () => {
    renderWithRouter(<App />);
    const allButtonsText = screen
      .getAllByTestId('pokemon-type-button')
      .map((item) => item.innerHTML);
    // Verificar se tem repetição no allButtons
    expect([...new Set(allButtonsText)].length).toBe(allButtonsText.length);
  });

  test('Pokédex deve circular somente pelos pokémons daquele tipo', () => {
    renderWithRouter(<App />);
    const pokemonTypeButton = screen.getAllByTestId('pokemon-type-button')[1];
    const buttonAll = screen.getByText(/all/i);
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(pokemonTypeButton);

    expect(buttonAll).toBeInTheDocument();
    let pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.innerHTML).toBe(pokemonTypeButton.innerHTML);

    expect(buttonAll).toBeInTheDocument();
    userEvent.click(pokemonTypeButton);
    pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.innerHTML).toBe(pokemonTypeButton.innerHTML);
    expect(buttonAll).toBeInTheDocument();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /all/i });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(screen.getByTestId(POKEMON_NAME_TEST_ID).innerHTML).toBe('Pikachu');
  });
});
