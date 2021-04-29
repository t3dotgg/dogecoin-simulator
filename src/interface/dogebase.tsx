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
        {marketStore.dogePerUSD.toFixed(5)}
        <DogeIcon /> per USD
      </div>
      <button
        onClick={() => {
          gameStore.addCoin(marketStore.dogePerUSD * 10);
          gameStore.spendUSD(10);
        }}
        disabled={gameStore.usd < 10}
      >
        Buy $10 of doge ({(marketStore.dogePerUSD * 10).toFixed(5)})
      </button>
      <button
        onClick={() => {
          gameStore.spendCoin(100000);
          gameStore.spendUSD(marketStore.dogePerUSD / 100000);
        }}
        disabled={gameStore.dogecoin < 100000}
      >
        Sell 100,000 doge (${(marketStore.dogePerUSD / 100000).toFixed(2)})
      </button>
    </div>
  );
};
