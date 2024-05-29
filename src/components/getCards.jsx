import { useState, useEffect } from "react";
import GetPokemon from "./pokemon.jsx";
import { Shuffle } from "./pokemon.jsx";

export default function App() {
  const [generation, setGeneration] = useState(1);
  const [difficulty, setDifficulty] = useState(6);
  const [clickedPokemon, setClickedPokemon] = useState([]);
  const [score, setScore] = useState(0);
  const [pokemonList, setPokemonList] = useState([]);
  const [visible, setVisible] = useState(true);
  const [win, setWin] = useState(false);
  const [lose, setLose] = useState(false);

  function generatePokemonList() {
    return Array.from({ length: difficulty }, (_, index) => ({
      key: index + Date.now(), // ensure unique keys
      generationNumber: generation,
    }));
  }

  useEffect(() => {
    setPokemonList(generatePokemonList());
  }, [generation, difficulty]);

  function handleGenerationClick(generation) {
    setGeneration(generation);
    setClickedPokemon([]);
    setWin(false);
    setLose(false);
    setScore(0);
    setPokemonList(generatePokemonList());
  }

  function easyDifficulty() {
    setDifficulty(3);
    setPokemonList(generatePokemonList());
  }

  function normalDifficulty() {
    setDifficulty(6);
    setPokemonList(generatePokemonList());
  }

  function hardDifficulty() {
    setDifficulty(10);
    setPokemonList(generatePokemonList());
  }

  function RestartGame() {
    setScore(0);
    setClickedPokemon([]);
    setWin(false);
    setLose(false);
    setPokemonList(generatePokemonList());
  }

  function WinHandler() {
    setWin(true);
  }

  function LostHandler() {
    setScore(0);
    setClickedPokemon([]);
    setPokemonList(generatePokemonList());
    setLose(true);
  }

  function handlePokemonClick(pokemonData) {
    if (clickedPokemon.some((pokemon) => pokemon.name === pokemonData.name)) {
      LostHandler();
    } else {
      setLose(false);
      const newScore = score + 1;
      setScore(newScore);
      if (newScore === difficulty) {
        WinHandler();
      }
    }
    setClickedPokemon([...clickedPokemon, pokemonData]);
    setVisible(false);
    setTimeout(() => {
      setPokemonList(Shuffle([...pokemonList]));
      setVisible(true);
    }, 1000);
  }

  console.log(pokemonList);
  return (
    <div className="container">
      <div className="gamestate">
        <h2>
          Score : {score} / {difficulty}
        </h2>

        <input type="button" id="restart" onClick={RestartGame} value="Restart?" />
        {win && <h2>You Win!</h2>}
        {lose && <h2>You Lost!</h2>}
      </div>
      <div className="generations">
        <input type="button" id="One" onClick={() => handleGenerationClick(1)} value="Generation 1" />
        <input type="button" id="Two" onClick={() => handleGenerationClick(2)} value="Generation 2" />
        <input type="button" id="Three" onClick={() => handleGenerationClick(3)} value="Generation 3" />
        <input type="button" id="Four" onClick={() => handleGenerationClick(4)} value="Generation 4" />
        <input type="button" id="Five" onClick={() => handleGenerationClick(5)} value="Generation 5" />
        <input type="button" id="Six" onClick={() => handleGenerationClick(6)} value="Generation 6" />
      </div>
      <div className="difficulties">
        <input type="button" onClick={easyDifficulty} value="Easy" />
        <input type="button" onClick={normalDifficulty} value="Normal" />
        <input type="button" onClick={hardDifficulty} value="Hard" />
      </div>
      <GetPokemon generationNumber={generation} count={difficulty} pokemonList={pokemonList} visible={visible} onClick={handlePokemonClick} />
    </div>
  );
}
