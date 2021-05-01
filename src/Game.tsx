import React from "react";
import { DevPanel } from "./dev/panel";
import { useGameRunner, useMarketRunner } from "./engine/runtime";
import { useStoragePersist } from "./engine/storage-persist";
import { DogeBase } from "./interface/dogebase";
import { MinerMarket } from "./interface/miner-market";
import { FactoryMarketplace } from "./interface/phase-two";
import { PhaseThree } from "./interface/phase-three";
import { MyStuff } from "./interface/your-stuff";
import { AdForTheo } from "./interface/theo-ad";
import { Backdrop } from "./special-effects/background";

function Game() {
  useGameRunner();
  useMarketRunner();
  useStoragePersist();

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <AdForTheo />
      <div className="gamescreen">
        <MyStuff />
        <DogeBase />
        <MinerMarket />
        <FactoryMarketplace />
        <PhaseThree />
      </div>
      {/* Extra stuff */}
      <DevPanel />
      <Backdrop />
    </div>
  );
}

export default Game;
