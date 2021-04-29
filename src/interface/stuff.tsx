import React from "react";
import { useGameStore } from "../engine/game";

export const MyStuff: React.FC = () => {
  const gameStore = useGameStore();

  return (
    <div>
      <div style={{ fontWeight: "bold", paddingBottom: 10 }}>
        DOGE: {gameStore.dogecoin}
      </div>
      <div style={{ fontWeight: 500, paddingBottom: 10 }}>
        HASH RATE: {gameStore.hashRate}
      </div>

      <div style={{ fontWeight: "bold" }}>MINERS</div>
      <div style={{ fontWeight: 500 }}>
        Small Miners: {gameStore.smallMiners}
      </div>
      <div style={{ fontWeight: 500 }}>
        Medium Miners: {gameStore.mediumMiners}
      </div>
      <div style={{ fontWeight: 500 }}>
        Large Miners: {gameStore.largeMiners}
      </div>
    </div>
  );
};
