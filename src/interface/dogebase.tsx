import React from "react";
import { DogeIcon } from "../common/dogeicon";
import { Header } from "../common/header";
import { useGameStore } from "../engine/game";
import { DogePriceChart } from "../common/doge-chart";

export const DogeBase: React.FC = () => {
  const gameStore = useGameStore();

  return (
    <div
      style={{
        backgroundColor: "darkgray",
        borderRadius: 8,
        maxWidth: 300,
        margin: 20,
      }}
    >
      <Header>Dogebase™</Header>
      <div
        style={{
          padding: 10,
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            paddingBottom: 10,
            display: "flex",
            alignItems: "center",
          }}
        >
          DOGE per USD:
          <div
            style={{
              fontFamily: "Comic Mono",
              paddingLeft: "0.5rem",
              display: "flex",
              alignItems: "Center",
            }}
          >
            {gameStore.dogePerUSD.toFixed(2)}
            <DogeIcon />
          </div>
        </div>
        <div
          style={{
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
          }}
        >
          USD per DOGE:
          <div
            style={{
              fontFamily: "Comic Mono",
              paddingLeft: "0.5rem",
              display: "flex",
              alignItems: "Center",
            }}
          >
            ${(1 / gameStore.dogePerUSD).toFixed(5)}
          </div>
        </div>
        <DogePriceChart />
        <button
          onClick={() => {
            gameStore.addCoin(gameStore.dogePerUSD * 10);
            gameStore.spendUSD(10);
          }}
          disabled={gameStore.usd < 10}
        >
          Buy $10 of doge ({(gameStore.dogePerUSD * 10).toFixed(2)})
        </button>
        {gameStore.phase > 1 && (
          <button
            onClick={() => {
              gameStore.addCoin(gameStore.dogePerUSD * 50);
              gameStore.spendUSD(50);
            }}
            disabled={gameStore.usd < 50}
          >
            Buy $50 of doge ({(gameStore.dogePerUSD * 50).toFixed(2)})
          </button>
        )}
        <button
          onClick={() => {
            gameStore.spendCoin(10000);
            gameStore.addUSD(10000 / gameStore.dogePerUSD);
          }}
          disabled={gameStore.dogecoin < 10000}
        >
          Sell 10,000 doge (${(10000 / gameStore.dogePerUSD).toFixed(2)})
        </button>
        {gameStore.phase > 1 && (
          <button
            onClick={() => {
              gameStore.spendCoin(50000);
              gameStore.addUSD(50000 / gameStore.dogePerUSD);
            }}
            disabled={gameStore.dogecoin < 50000}
          >
            Sell 50,000 doge (${(50000 / gameStore.dogePerUSD).toFixed(2)})
          </button>
        )}
      </div>
    </div>
  );
};
