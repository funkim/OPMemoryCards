import { useState } from "react";
import GetPokemon from "./pokemon";

export default function App() {
  const [generation, setGeneration] = useState(1);

  async function CreateCards({ thisGeneration = 0, difficulty = 6 }) {
    setGeneration(thisGeneration);
    for (let i = 0; i < difficulty; i++) {
      GetPokemon(thisGeneration);
    }
  }

  function handleButtonClick(generation) {
    CreateCards({ thisGeneration: generation });
  }

  return (
    <div>
      <div>
        <input type="button" id="One" onClick={() => handleButtonClick(1)} value="Generation 1" />
        <input type="button" id="Two" onClick={() => handleButtonClick(2)} value="Generation 2" />
        <input type="button" id="Three" onClick={() => handleButtonClick(3)} value="Generation 3" />
        <input type="button" id="Four" onClick={() => handleButtonClick(4)} value="Generation 4" />
        <input type="button" id="Five" onClick={() => handleButtonClick(5)} value="Generation 5" />
        <input type="button" id="Six" onClick={() => handleButtonClick(6)} value="Generation 6" />
      </div>
      <GetPokemon generationNumber={generation} />
    </div>
  );
}
