import React from "react";
import { useGameStore } from "../engine/game";

export const PhaseTwo: React.FC = () => {
  const gameStore = useGameStore();

  if (gameStore.dogecoin < 100000) return null;

  return (
    <div
      style={{
        backgroundColor: "darkgray",
        padding: 10,
        borderRadius: 8,
        width: 300,
        margin: 20,
      }}
    >
      Phase Two (coming soon)
    </div>
  );
};
