import React from "react";
import { useGameStore } from "../engine/game";

export const MinerMarket: React.FC = () => {
  const gameStore = useGameStore();

  return (
    <div
      style={{
        backgroundColor: "lightgray",
        padding: 10,
        borderRadius: 8,
        maxWidth: 300,
        marginTop: 50,
      }}
    >
      <div style={{ fontWeight: "bold" }}>STORE</div>
      <button
        onClick={() => {
          gameStore.addSmallMiner();
          gameStore.spendCoin(50);
          gameStore.updateHashRate();
        }}
      >
        Buy small miner (50 DOGE)
      </button>
      <button
        onClick={() => {
          gameStore.addMediumMiner();
          gameStore.spendCoin(200);
          gameStore.updateHashRate();
        }}
      >
        Buy medium miner (200 DOGE)
      </button>
      <button
        onClick={() => {
          gameStore.addLargeMiner();
          gameStore.spendCoin(500);
          gameStore.updateHashRate();
        }}
      >
        Buy large miner (500 DOGE)
      </button>
    </div>
  );
};
