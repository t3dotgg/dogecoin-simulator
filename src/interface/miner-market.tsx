import React from "react";
import { Header } from "../common/header";
import {
  getLargeMinerPrice,
  getMediumMinerPrice,
  getSmallMinerPrice,
  useGameStore,
} from "../engine/game";

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
  const gameStore = useGameStore();

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
          disabled={usd < getSmallMinerPrice(gameStore.smallMiners)}
          data-tip="+5 hash rate"
        >
          Buy crappy miner (${getSmallMinerPrice(gameStore.smallMiners)})
        </button>
        <div style={{ paddingBottom: 5 }} />
        <button
          onClick={() => {
            buyMediumMiner();
          }}
          disabled={usd < getMediumMinerPrice(gameStore.mediumMiners)}
          data-tip="+25 hash rate"
        >
          Buy decent miner (${getMediumMinerPrice(gameStore.mediumMiners)})
        </button>
        <div style={{ paddingBottom: 5 }} />
        <button
          onClick={() => {
            buyLargeMiner();
          }}
          disabled={usd < getLargeMinerPrice(gameStore.largeMiners)}
          data-tip="+70 hash rate"
        >
          Buy good miner (${getLargeMinerPrice(gameStore.largeMiners)})
        </button>
      </div>
    </div>
  );
};
