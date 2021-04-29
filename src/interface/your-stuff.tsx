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
          paddingBottom: 10,
          display: "flex",
          alignItems: "center",
        }}
      >
        <DogeIcon />
        {gameStore.dogecoin.toFixed(5)}
      </div>
      <div
        style={{
          fontWeight: "bold",
          paddingBottom: 10,
          display: "flex",
          alignItems: "center",
        }}
      >
        USD: ${gameStore.usd.toFixed(2)}
      </div>
      <div
        style={{
          fontWeight: 500,
          paddingBottom: 10,
          display: "flex",
          alignItems: "center",
        }}
      >
        HASH RATE: {hashRate} <div style={{ paddingRight: "0.2rem" }} />
        <DogeIcon /> per second
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
