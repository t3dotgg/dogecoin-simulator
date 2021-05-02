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
        right: -2,
        bottom: -2,
        padding: 15,
        borderTopLeftRadius: 8,
        border: "1px solid black",
        backgroundColor: "red",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ paddingBottom: 10, fontWeight: "bold" }}>Data</div>
      <div>Phase: {gameStore.phase}</div>
      <div>Luck: {gameStore.luck}</div>
      <div style={{ paddingBottom: 10, paddingTop: 10, fontWeight: "bold" }}>
        Cheats
      </div>
      <button onClick={() => gameStore.addCoin(100000)}>+100k doge</button>
      <button onClick={() => gameStore.addCoin(10000000)}>+10m doge</button>
      <button onClick={() => gameStore.addUSD(10000)}>+10k USD</button>
    </div>
  );
};
