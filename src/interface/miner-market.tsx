import React from "react";
import { Header } from "../common/header";
import { useGameStore } from "../engine/game";

export const MinerMarket: React.FC = () => {
  const usd = useGameStore((state) => state.usd);
  const isEnabled = useGameStore((state) => state.maxDogecoin > 10000);
  const [
    buySmallMiner,
    buyMediumMiner,
    buyLargeMiner,
  ] = useGameStore((state) => [
    state.buySmallMiner,
    state.buyMediumMiner,
    state.buyLargeMiner,
  ]);

  if (!isEnabled) return null;

  return (
    <div className="panel">
      <Header>Doge Miner Marketplace</Header>
      <div
        style={{
          padding: 10,
        }}
      >
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
    </div>
  );
};
