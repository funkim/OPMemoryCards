import React, { useState, useEffect, useRef } from "react";

function Pokemon({ generationNumber, onClick, pokemonKey, visible }) {
  const [pokemonData, setPokemonData] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    async function getPokemon() {
      const generation = await fetch(`https://pokeapi.co/api/v2/generation/${generationNumber}/`);
      const generationData = await generation.json();
      const allGenerationPokemon = generationData.pokemon_species;
      let randomPokemonNumber = allGenerationPokemon[Math.floor(Math.random() * allGenerationPokemon.length)];
      const thisPokemonName = randomPokemonNumber.name;
      const thisPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${thisPokemonName}/`);
      const thisPokemonData = await thisPokemon.json();
      if (thisPokemonData == "N") {
        getPokemon;
        console.log("refetch'd");
      }
      let thisPokemonSprite = thisPokemonData.sprites.other["official-artwork"].front_default
        ? thisPokemonData.sprites.other["official-artwork"].front_default
        : thisPokemonData.sprites.front_default;
      const thisPokemonCry = thisPokemonData.cries?.latest || null;
      setPokemonData({
        name: thisPokemonName,
        sprite: thisPokemonSprite,
        cry: thisPokemonCry,
        data: thisPokemonData,
        number: randomPokemonNumber,
      });
    }
    getPokemon();
  }, [generationNumber, pokemonKey]);

  function handlePokemonClick() {
    if (audioRef.current) {
      audioRef.current.volume = 0.1;
      audioRef.current.play();
    }
    if (onClick && pokemonData) {
      onClick(pokemonData);
    }
  }

  return (
    <div className="pokemon">
      {visible && pokemonData ? (
        <img src={pokemonData.sprite} alt="Pokemon Sprite" onClick={handlePokemonClick} />
      ) : (
        <img src="https://pngfre.com/wp-content/uploads/Pokeball-1.png" alt="Empty Pokemon Sprite" className="empty" />
      )}
      {pokemonData?.cry ? <audio ref={audioRef} src={pokemonData.cry} alt="Pokemon Sound" /> : null}
    </div>
  );
}

export default function GetPokemon({ pokemonList, visible, generationNumber, onClick }) {
  return (
    <div className="pokemon-container">
      {pokemonList.map((pokemon) => (
        <Pokemon key={pokemon.key} generationNumber={pokemon.generationNumber} onClick={onClick} visible={visible} />
      ))}
    </div>
  );
}

export function Shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}
