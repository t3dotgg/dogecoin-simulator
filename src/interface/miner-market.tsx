import React, { useEffect } from "react";
import { useGameStore } from "../engine/game";

export const MinerMarket: React.FC = () => {
  const usd = useGameStore((state) => state.usd);
  const [
    buySmallMiner,
    buyMediumMiner,
    buyLargeMiner,
  ] = useGameStore((state) => [
    state.buySmallMiner,
    state.buyMediumMiner,
    state.buyLargeMiner,
  ]);

  return (
    <div
      style={{
        backgroundColor: "darkgray",
        padding: 10,
        borderRadius: 8,
        maxWidth: 300,
        margin: 20,
        position: "relative",
      }}
    >
      <div style={{ fontWeight: "bold", color: "white", paddingBottom: 10 }}>
        MINER MARKETPLACE
      </div>
      <button
        onClick={() => {
          buySmallMiner();
        }}
        disabled={usd < 50}
        data-tip="+5 hash rate"
      >
        Buy small miner ($50)
      </button>
      <div style={{ paddingBottom: 5 }} />
      <button
        onClick={() => {
          buyMediumMiner();
        }}
        disabled={usd < 200}
        data-tip="+25 hash rate"
      >
        Buy medium miner ($200)
      </button>
      <div style={{ paddingBottom: 5 }} />
      <button
        onClick={() => {
          buyLargeMiner();
        }}
        disabled={usd < 500}
        data-tip="+70 hash rate"
      >
        Buy large miner ($500)
      </button>
    </div>
  );
};
