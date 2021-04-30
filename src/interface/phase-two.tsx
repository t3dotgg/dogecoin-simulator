import React from "react";
import { useGameStore } from "../engine/game";

export const FactoryMarketplace: React.FC = () => {
  const usd = useGameStore((state) => state.usd);
  const phase = useGameStore((state) => state.phase);

  if (phase < 2) return null;

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
        DOGE ESTATE
      </div>
      <button onClick={() => {}} disabled={usd < 50000}>
        Buy a server warehouse for mining ($50,000)
      </button>
      <button onClick={() => {}} disabled={usd < 20000}>
        Buy a meme factory ($20,000)
      </button>
    </div>
  );
};
