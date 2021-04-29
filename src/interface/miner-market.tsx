import React from "react";
import { useGameStore } from "../engine/game";

export const MinerMarket: React.FC = () => {
  const gameStore = useGameStore();

  return (
    <div
      style={{
        backgroundColor: "darkgray",
        padding: 10,
        borderRadius: 8,
        maxWidth: 300,
        margin: 20,
      }}
    >
      <div style={{ fontWeight: "bold", color: "white", paddingBottom: 10 }}>
        MINER MARKETPLACE
      </div>
      <button
        onClick={() => {
          gameStore.buySmallMiner();
        }}
        disabled={gameStore.usd < 50}
      >
        Buy small miner (50 USD)
      </button>
      <div style={{ paddingBottom: 5 }} />
      <button
        onClick={() => {
          gameStore.buyMediumMiner();
        }}
        disabled={gameStore.usd < 200}
      >
        Buy medium miner (200 USD)
      </button>
      <div style={{ paddingBottom: 5 }} />
      <button
        onClick={() => {
          gameStore.buyLargeMiner();
        }}
        disabled={gameStore.usd < 500}
      >
        Buy large miner (500 USD)
      </button>
    </div>
  );
};
