import React from "react";
import { Header } from "../common/header";
import { useGameStore } from "../engine/game";

export const ObjectivePicker: React.FC = () => {
  const phase = useGameStore((state) => state.phase);
  const currentMission = useGameStore((state) => state.currentMission);
  const setCurrentMission = useGameStore((state) => state.setCurrentMission);

  if (phase < 4 || currentMission !== null) return null;

  return (
    <div className="panel">
      <Header>Company Objectives</Header>
      <div style={{ padding: 5 }}>Choose wisely</div>
      <div
        style={{
          padding: 10,
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <button onClick={() => setCurrentMission("To The Moon")}>
          To The Moon!
        </button>
      </div>
    </div>
  );
};
