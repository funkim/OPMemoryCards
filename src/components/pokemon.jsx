import React, { useState, useEffect, useRef } from "react";

export default function GetPokemon({ generationNumber = 1 }) {
  const [pokemonSprite, setPokemonSprite] = useState(null);
  const [pokemonSound, setPokemonSound] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    async function getPokemon() {
      const generation = await fetch(`https://pokeapi.co/api/v2/generation/${generationNumber}/`);
      const generationData = await generation.json();
      const allGenerationPokemon = await generationData.pokemon_species;
      let randomPokemonNumber = allGenerationPokemon[Math.floor(Math.random() * allGenerationPokemon.length)];
      const thisPokemonName = randomPokemonNumber.name;
      const thisPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${thisPokemonName}/`);
      const thisPokemonData = await thisPokemon.json();
      const thisPokemonSprite = thisPokemonData.sprites.other["official-artwork"].front_default;
      const thisPokemonCry = thisPokemonData.cries.latest;
      setPokemonSprite(thisPokemonSprite);
      setPokemonSound(thisPokemonCry);
    }

    getPokemon();
  }, [generationNumber]);

  function playSound() {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }

  return (
    <div className="pokemon">
      {pokemonSprite ? <img src={pokemonSprite} alt="Pokemon Sprite" onClick={playSound} /> : <p>Loading...</p>}
      {pokemonSound ? <audio ref={audioRef} src={pokemonSound} alt="Pokemon Sound" /> : null}
    </div>
  );
}
