import React from "react";
import { useGameStore } from "../engine/game";
import { GAME_STORAGE_KEY } from "../engine/types";

export const DevPanel: React.FC = () => {
  const gameStore = useGameStore();

  const urlParams = new URLSearchParams(window.location.search);
  const devMode = urlParams.get("devmode");

  if (!devMode) return null;

  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        bottom: 0,
        padding: 100,
        backgroundColor: "red",
        display: "flex",
        flexDirection: "column",
        color: "white",
      }}
    >
      <div style={{ paddingBottom: 10 }}>Dev panel</div>
      <button onClick={() => gameStore.addCoin(10000)}>+10k</button>
      <button
        onClick={() => {
          localStorage.removeItem(GAME_STORAGE_KEY);
          window.location.reload();
        }}
      >
        Reset
      </button>
    </div>
  );
};
