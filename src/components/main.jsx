import React from "react";
import ReactDOM from "react-dom/client";
import "../styles/index.css";
import CallPokemonAPI from "./pokemon";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CallPokemonAPI />
  </React.StrictMode>
);
