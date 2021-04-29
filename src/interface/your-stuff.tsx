import React from "react";
import { useGameStore, useHashRate } from "../engine/game";

const DogeIcon = () => (
  <img
    src="/assets/dogecoin-logo.png"
    style={{ height: "1rem", paddingRight: "0.5rem" }}
  />
);

export const MyStuff: React.FC = () => {
  const gameStore = useGameStore();
  const hashRate = useHashRate();

  return (
    <div
      style={{
        fontFamily: "Roboto mono",
        backgroundColor: "lightgray",
        borderRadius: 8,
        maxWidth: 300,
        margin: 20,
        padding: 10,
      }}
    >
      <div>YOUR STUFF</div>
      <div
        style={{
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
        }}
      >
        Dogecoin: {gameStore.dogecoin.toFixed(2)}
        <DogeIcon />
      </div>
      <div
        style={{
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
        }}
      >
        USD: ${gameStore.usd.toFixed(2)}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        HASH RATE: {hashRate} <div style={{ paddingRight: "0.2rem" }} />
        <DogeIcon /> per second
      </div>

      {gameStore.smallMiners > 0 && (
        <div>Small Miners: {gameStore.smallMiners}</div>
      )}
      {gameStore.mediumMiners > 0 && (
        <div>Medium Miners: {gameStore.mediumMiners}</div>
      )}
      {gameStore.largeMiners > 0 && (
        <div>Large Miners: {gameStore.largeMiners}</div>
      )}
    </div>
  );
};
