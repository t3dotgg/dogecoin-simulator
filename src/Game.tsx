import React from "react";
import { DevPanel } from "./dev/panel";
import { useGameRunner, useMarketRunner } from "./engine/runtime";
import { useStoragePersist } from "./engine/storage-persist";
import { DogeBase } from "./interface/dogebase";
import { MinerMarket } from "./interface/miner-market";
import { FactoryMarketplace } from "./interface/real-estate";
import { ObjectivePicker } from "./interface/objective-picker";
import { MyStuff } from "./interface/your-stuff";
import { AdForTheo } from "./interface/theo-ad";
import { Backdrop } from "./special-effects/background";
import { DogeHQ } from "./interface/doge-hq";
import { TwitterFeed } from "./interface/twitter";
import { MoonMissionPlanning } from "./interface/moon-launch-pad";
import { MoonPanel } from "./interface/moon-panel";

function Game() {
  useGameRunner();
  useMarketRunner();
  useStoragePersist();

  const body = React.useMemo(
    () => (
      <div className="app">
        <AdForTheo />
        <div className="gamescreen">
          <div
            className="onlyMobile"
            style={{ paddingTop: "2.5rem", height: 0, width: 10 }}
          />
          <MyStuff />
          <DogeBase />
          <TwitterFeed />
          <ObjectivePicker />
          <DogeHQ />
          <MoonMissionPlanning />
          <MinerMarket />
          <FactoryMarketplace />
          <div
            className="onlyMobile"
            style={{ paddingTop: "2.5rem", height: 0, width: 10 }}
          />
          <MoonPanel />
        </div>
        {/* Extra stuff */}
        <DevPanel />
        <Backdrop />
      </div>
    ),
    []
  );

  return <div>{body}</div>;
}

export default Game;
