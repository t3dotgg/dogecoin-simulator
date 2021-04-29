import React from "react";
import { DogeIcon } from "../common/dogeicon";
import { useGameStore } from "../engine/game";
import { useMarketStorage } from "../engine/market";

export const DogeBase: React.FC = () => {
  const gameStore = useGameStore();
  const marketStore = useMarketStorage();

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
        DOGEBASE
      </div>
      <div
        style={{
          fontWeight: "bold",
          paddingBottom: 10,
          display: "flex",
          alignItems: "center",
        }}
      >
        {marketStore.dogePerUSD.toFixed(2)}
        <DogeIcon /> per USD
      </div>
      <button
        onClick={() => {
          gameStore.addCoin(marketStore.dogePerUSD * 10);
          gameStore.spendUSD(10);
        }}
        disabled={gameStore.usd < 10}
      >
        Buy $10 of doge ({(marketStore.dogePerUSD * 10).toFixed(2)})
      </button>
      <button
        onClick={() => {
          gameStore.spendCoin(10000);
          gameStore.addUSD(10000 / marketStore.dogePerUSD);
        }}
        disabled={gameStore.dogecoin < 10000}
      >
        Sell 10,000 doge (${(10000 / marketStore.dogePerUSD).toFixed(2)})
      </button>
    </div>
  );
};
