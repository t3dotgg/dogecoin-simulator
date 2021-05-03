import React from "react";
import { Header } from "../common/header";
import { useGameStore } from "../engine/game";

export const PhaseFour: React.FC = () => {
  const phase = useGameStore((state) => state.phase);

  if (phase < 4) return null;

  return (
    <div className="panel">
      <Header>PHASE FOUR (COMING SOON)</Header>
      <div style={{ padding: 10 }}>
        Seriously though,, how did you make it this far so early? Go bug Theo to
        finish the next phase if you want to keep playing
      </div>
    </div>
  );
};
