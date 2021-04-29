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
        marginTop: 50,
      }}
    >
      <div style={{ fontWeight: "bold", color: "white", paddingBottom: 10 }}>
        STORE
      </div>
      <button
        onClick={() => {
          gameStore.addSmallMiner();
          gameStore.spendCoin(50);
          gameStore.updateHashRate();
        }}
        disabled={gameStore.dogecoin < 50}
      >
        Buy small miner (50 DOGE)
      </button>
      <div style={{ paddingBottom: 5 }} />
      <button
        onClick={() => {
          gameStore.addMediumMiner();
          gameStore.spendCoin(200);
          gameStore.updateHashRate();
        }}
        disabled={gameStore.dogecoin < 200}
      >
        Buy medium miner (200 DOGE)
      </button>
      <div style={{ paddingBottom: 5 }} />
      <button
        onClick={() => {
          gameStore.addLargeMiner();
          gameStore.spendCoin(500);
          gameStore.updateHashRate();
        }}
        disabled={gameStore.dogecoin < 500}
      >
        Buy large miner (500 DOGE)
      </button>
    </div>
  );
};
