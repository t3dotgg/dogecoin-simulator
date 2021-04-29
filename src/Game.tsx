import React from "react";
import { useGameRunner } from "./engine/runtime";
import { MinerMarket } from "./interface/miner-market";
import { MyStuff } from "./interface/stuff";

function Game() {
  useGameRunner();

  return (
    <div style={{ padding: 10 }}>
      <header className="App-header">
        <MyStuff />

        <MinerMarket />
      </header>
    </div>
  );
}

export default Game;
