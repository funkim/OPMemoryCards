import { useState } from "react";
import GetPokemon from "./pokemon.jsx";

export default function App() {
  const [generation, setGeneration] = useState(1);
  const [difficulty, setDifficulty] = useState(6);
  const [clickedPokemon, setClickedPokemon] = useState([]);
  const [score, setScore] = useState(0);

  function handleGenerationClick(generation) {
    setGeneration(generation);
    setClickedPokemon([]);
    setScore(0);
  }

  function easyDifficulty() {
    setDifficulty(3);
  }
  function normalDifficulty() {
    setDifficulty(6);
  }
  function hardDifficulty() {
    setDifficulty(9);
  }

  function handlePokemonClick(pokemonData) {
    if (clickedPokemon.some((pokemon) => pokemon.name === pokemonData.name)) {
      setScore(0);
    } else {
      setScore(score + 1);
    }
    setClickedPokemon([...clickedPokemon, pokemonData]);
    console.log(...clickedPokemon);
  }
  return (
    <div>
      <h2>{score}</h2>
      <div>
        <input type="button" id="One" onClick={() => handleGenerationClick(1)} value="Generation 1" />
        <input type="button" id="Two" onClick={() => handleGenerationClick(2)} value="Generation 2" />
        <input type="button" id="Three" onClick={() => handleGenerationClick(3)} value="Generation 3" />
        <input type="button" id="Four" onClick={() => handleGenerationClick(4)} value="Generation 4" />
        <input type="button" id="Five" onClick={() => handleGenerationClick(5)} value="Generation 5" />
        <input type="button" id="Six" onClick={() => handleGenerationClick(6)} value="Generation 6" />
      </div>
      <button onClick={easyDifficulty}>Easy</button>
      <button onClick={normalDifficulty}>Normal</button>
      <button onClick={hardDifficulty}>Hard</button>
      <GetPokemon generationNumber={generation} count={difficulty} onClick={handlePokemonClick} />
    </div>
  );
}
