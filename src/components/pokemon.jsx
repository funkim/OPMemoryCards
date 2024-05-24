import React, { useState, useEffect } from "react";

export default function GetPokemon() {
  const [pokemonSprite, setPokemonSprite] = useState(null);
  const [pokemonSound, setPokemonSound] = useState(null);

  useEffect(() => {
    async function getPokemon() {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/clefairy/"
      );
      const data = await response.json();
      console.log(data);
      const sprite = data.sprites.front_default;
      setPokemonSprite(sprite);
    }

    getPokemon();
  }, []);

  async function fetchPokemonSound() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/clefairy/");
    const data = await response.json();
    const sound = data.cries.latest;
    setPokemonSound(sound);
  }

  return (
    <div className="pokemon">
      {pokemonSprite ? (
        <img
          src={pokemonSprite}
          alt="Pokemon Sprite"
          onClick={fetchPokemonSound}
        />
      ) : (
        <p>Loading...</p>
      )}
      {pokemonSound ? (
        <audio src={pokemonSound} alt="Pokemon Sound" autoPlay />
      ) : null}
    </div>
  );
}
