import React from "react";
import { Header } from "../common/header";
import { useGameStore } from "../engine/game";
import { RealEstate } from "../engine/types";

export const DogeHQ: React.FC = () => {
  const realEstate = useGameStore((state) => state.realEstate);
  const hasFactory = realEstate.includes(RealEstate.MemeFactory);

  const dogeCount = useGameStore((state) => state.dogecoin);
  const spendCoin = useGameStore((state) => state.spendCoin);
  const addToLuck = useGameStore((state) => state.addToLuck);
  const addToTweetCount = useGameStore((state) => state.addToTweetCount);

  if (!hasFactory) return null;

  return (
    <div className="panel">
      <Header>
        <span className="colorful-text">Doge HQ</span>
      </Header>
      <div style={{ padding: 10 }}>
        <button
          onClick={() => {
            spendCoin(50000);
            const luckyNumber = Math.random();

            if (luckyNumber > 0.7) {
              addToLuck(1);
            }
            if (luckyNumber < 0.2) {
              addToLuck(-1);
            }

            addToTweetCount(1);
          }}
          disabled={dogeCount < 50000}
          data-tip="Send a random tweet about Dogecoin"
          style={{ display: "flex", alignItems: "center", flexWrap: "nowrap" }}
        >
          Tweet about Dogecoin (50,000 Doge)
        </button>
      </div>
    </div>
  );
};
