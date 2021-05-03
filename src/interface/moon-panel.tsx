import React from "react";
import { useGameStore } from "../engine/game";

export const MoonPanel: React.FC = () => {
  const location = useGameStore((state) => state.currentLocation);

  if (location !== "moon") return null;
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
      <br />
      This is "endgame" for now, expect more updates soon
    </div>
  );
};
