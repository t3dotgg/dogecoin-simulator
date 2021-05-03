import React from "react";
import { Header } from "../common/header";
import { MissionSuccessCountup } from "../common/mission-success-countup";
import { useGameStore, useResearchRate } from "../engine/game";

export const MoonMissionPlanning: React.FC = () => {
  const mission = useGameStore((state) => state.currentMission);
  const successChance = useGameStore((state) => state.successChance);
  const minerAllocation = useGameStore((state) => state.minerAllocation);
  const setMinerAllocation = useGameStore((state) => state.setMinerAllocation);
  const researchRate = useResearchRate();

  if (mission !== "To The Moon") return null;

  return (
    <div className="panel">
      <Header>🚀 Moon Mission Planning</Header>
      <div style={{ padding: 10 }}>
        {`Success Chance:`}
        <br />
        <MissionSuccessCountup successPercentage={successChance * 100} />
      </div>
      <div style={{ padding: 10, paddingTop: 0 }}>
        {`Research rate:`}
        <br />
        {`${(researchRate * 100).toFixed(8)}% per sec`}
      </div>
      <div style={{ padding: 5, fontWeight: "bold" }}>Miner allocation</div>
      <div style={{ padding: 10, display: "flex", flexDirection: "column" }}>
        <input
          type="range"
          onChange={(change) =>
            setMinerAllocation(parseFloat(change.currentTarget.value))
          }
          value={minerAllocation.toString()}
          min={0}
          max={1}
          step={0.02}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Mining</span>
          <span>Research</span>
        </div>
      </div>
    </div>
  );
};
