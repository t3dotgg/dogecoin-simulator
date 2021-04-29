import React from "react";
import { DevPanel } from "./dev/panel";
import { useGameRunner, useMarketRunner } from "./engine/runtime";
import { useStoragePersist } from "./engine/storage-persist";
import { DogeBase } from "./interface/dogebase";
import { MinerMarket } from "./interface/miner-market";
import { PhaseTwo } from "./interface/phase-two";
import { MyStuff } from "./interface/your-stuff";
import { AdForTheo } from "./interface/theo-ad";

function Game() {
  useGameRunner();
  useMarketRunner();
  useStoragePersist();

  return (
    <div className="gamescreen">
      <MyStuff />

      <DogeBase />

      <MinerMarket />

      <PhaseTwo />

      <DevPanel />

      <AdForTheo />
    </div>
  );
}

export default Game;
