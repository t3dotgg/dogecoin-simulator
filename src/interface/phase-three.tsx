import React from "react";
import { useGameStore } from "../engine/game";

export const PhaseThree: React.FC = () => {
  const phase = useGameStore((state) => state.phase);

  if (phase < 3) return null;

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
        PHASE THREE (COMING SOON)
      </div>
      <div>
        Seriously though,, how did you make it this far so early? Go bug Theo to
        finish the next phase if you want to keep playing
      </div>
    </div>
  );
};
