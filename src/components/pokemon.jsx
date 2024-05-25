import React, { useState, useEffect, useRef } from "react";

function Pokemon({ generationNumber, onClick }) {
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
      let thisPokemonSprite = thisPokemonData.sprites.other["official-artwork"].front_default
        ? thisPokemonData.sprites.other["official-artwork"].front_default
        : thisPokemonData.sprites.front_default;
      const thisPokemonCry = thisPokemonData.cries?.latest || null;
      setPokemonData({
        name: thisPokemonName,
        sprite: thisPokemonSprite,
        cry: thisPokemonCry,
        data: thisPokemonData,
      });
    }

    getPokemon();
  }, [generationNumber]);

  function handlePokemonClick() {
    if (audioRef.current) {
      audioRef.current.play();
    }
    if (onClick && pokemonData) {
      onClick(pokemonData);
    }
  }

  return (
    <div className="pokemon">
      {pokemonData ? (
        <img src={pokemonData.sprite} alt="Pokemon Sprite" onClick={handlePokemonClick} />
      ) : (
        <img src="https://i.etsystatic.com/14825908/r/il/850fbd/1818252638/il_570xN.1818252638_e8ii.jpg" alt="Empty Pokemon Sprite" />
      )}
      {pokemonData?.cry ? <audio ref={audioRef} src={pokemonData.cry} alt="Pokemon Sound" /> : null}
    </div>
  );
}

export default function GetPokemon({ generationNumber, count, onClick }) {
  return (
    <div className="pokemon-container">
      {Array.from({ length: count }).map((_, index) => (
        <Pokemon key={index} generationNumber={generationNumber} onClick={onClick} />
      ))}
    </div>
  );
}
