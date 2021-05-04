import React from "react";
import { useGameStore } from "../engine/game";
import { getVictoryStorage } from "../engine/victory-store";

const generateTimestamp = (seconds: number) =>
  new Date(seconds * 1000).toISOString().substr(11, 8);

export const MoonPanel: React.FC = () => {
  const location = useGameStore((state) => state.currentLocation);
  if (location !== "moon") return null;

  const victories = getVictoryStorage();

  return (
    <div
      className="panel"
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        padding: 10,
        fontSize: 20,
      }}
    >
      Congrats! You're in space!
      <br />
      This is "endgame" for now, expect more updates soon
      <br />
      <br />
      Victories
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: "1rem",
          textAlign: "left",
          maxHeight: 300,
          overflowY: "scroll",
        }}
      >
        {victories.map((victory, index) => (
          <div style={{ paddingTop: 10 }}>
            <div style={{ fontWeight: "bold" }}>Victory #{index + 1}</div>
            <div style={{ fontWeight: 300, fontSize: 12, marginTop: "-3px" }}>
              {new Date(victory.date).toLocaleString()}
            </div>
            <div>Time to complete: {generateTimestamp(victory.ticks / 10)}</div>
            <div>Max doge: {victory.maxDoge.toFixed(0)}</div>
            <div>Casualties: {victory.casualties}</div>
            <div>Failures: {victory.casualties}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
