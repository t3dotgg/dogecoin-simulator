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
    <div className="app">
      <AdForTheo />
      <div className="gamescreen">
        <div
          className="onlyMobile"
          style={{ paddingTop: "2.5rem", height: 0, width: 10 }}
        />
        <MyStuff />
        <DogeBase />
        <MinerMarket />
        <FactoryMarketplace />
        <PhaseThree />
        <div
          className="onlyMobile"
          style={{ paddingTop: "2.5rem", height: 0, width: 10 }}
        />
      </div>
      {/* Extra stuff */}
      <DevPanel />
      <Backdrop />
    </div>
  );
}

export default Game;
