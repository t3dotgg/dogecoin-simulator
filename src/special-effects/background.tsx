import React from "react";
import { useGameStore } from "../engine/game";
import { RealEstate } from "../engine/types";

export const Backdrop: React.FC = () => {
  const doge = useGameStore((state) => state.maxDogecoin);
  const hasPool = useGameStore((state) =>
    state.realEstate.includes(RealEstate.Pool)
  );
  return (
    <div
      style={{
        position: "absolute",
        zIndex: -1,
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
      }}
    >
      <img
        src="/assets/invisidoge.png"
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          opacity: Math.min(doge / 1000000, 1),
          maxWidth: "50%",
          zIndex: 100, //We want this above background stuff
        }}
      />
      <img
        src="/assets/fancy-house.jpeg"
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          opacity: hasPool ? Math.min((doge - 1000000) / 1000000, 1) : 0,
          zIndex: 0,
          minWidth: "100%",
          minHeight: "100%",
        }}
      />
    </div>
  );
};
