import React from "react";
import { useGameStore } from "../engine/game";

const DogeIcon = () => (
  <img
    src="/assets/dogecoin-logo.png"
    style={{ height: "1rem", paddingRight: "0.5rem" }}
  />
);

export const MyStuff: React.FC = () => {
  const gameStore = useGameStore();

  return (
    <div
      style={{
        fontFamily: "Roboto mono",
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
        <DogeIcon />
        {gameStore.dogecoin.toFixed(5)}
      </div>
      <div
        style={{
          fontWeight: 500,
          paddingBottom: 10,
          display: "flex",
          alignItems: "center",
        }}
      >
        HASH RATE: {gameStore.hashRate}{" "}
        <div style={{ paddingRight: "0.2rem" }} />
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
