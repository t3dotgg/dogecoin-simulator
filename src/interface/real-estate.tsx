import React from "react";
import { useGameStore } from "../engine/game";
import { RealEstate } from "../engine/types";

import ReactTooltip from "react-tooltip";
import { Header } from "../common/header";

export const FactoryMarketplace: React.FC = () => {
  const usd = useGameStore((state) => state.usd);
  const phase = useGameStore((state) => state.phase);
  const acquireProperty = useGameStore((state) => state.acquireProperty);
  const realEstate = useGameStore((state) => state.realEstate);
  const spendUSD = useGameStore((state) => state.spendUSD);

  React.useEffect(() => {
    ReactTooltip.rebuild();
  }, [usd, phase]);

  if (phase < 2 || realEstate.length >= 3) return null;

  return (
    <div className="panel">
      <Header>Doge Estate</Header>
      <div
        style={{
          padding: 10,
        }}
      >
        {!realEstate.includes(RealEstate.Server) && (
          <button
            onClick={() => {
              acquireProperty(RealEstate.Server);
              spendUSD(5000);
            }}
            disabled={usd < 5000}
            data-tip="Multiply hash rate by 1.3x"
          >
            Buy a server warehouse for mining ($5,000)
          </button>
        )}
        {!realEstate.includes(RealEstate.MemeFactory) && (
          <button
            onClick={() => {
              acquireProperty(RealEstate.MemeFactory);
              spendUSD(8000);
            }}
            disabled={usd < 8000}
            data-tip="Generate memes"
          >
            Buy a meme factory ($8,000)
          </button>
        )}
        {!realEstate.includes(RealEstate.Pool) && (
          <button
            onClick={() => {
              acquireProperty(RealEstate.Pool);
              spendUSD(20000);
            }}
            disabled={usd < 20000}
            data-tip="Pools are cool"
          >
            Buy a pool ($20,000)
          </button>
        )}
      </div>
    </div>
  );
};
