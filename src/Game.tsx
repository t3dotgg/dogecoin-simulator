import React from "react";
import { DevPanel } from "./dev/panel";
import { useGameRunner } from "./engine/runtime";
import { useStoragePersist } from "./engine/storage-persist";
import { MinerMarket } from "./interface/miner-market";
import { PhaseTwo } from "./interface/phase-two";
import { MyStuff } from "./interface/stuff";
import { AdForTheo } from "./interface/theo-ad";

function Game() {
  useGameRunner();
  useStoragePersist();

  return (
    <div className="gamescreen">
      <MyStuff />

      <MinerMarket />

      <PhaseTwo />

      <DevPanel />

      <AdForTheo />
    </div>
  );
}

export default Game;
