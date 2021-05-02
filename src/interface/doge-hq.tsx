import React from "react";
import { Header } from "../common/header";
import { useGameStore } from "../engine/game";
import { RealEstate } from "../engine/types";

export const DogeHQ: React.FC = () => {
  const realEstate = useGameStore((state) => state.realEstate);
  const hasFactory = realEstate.includes(RealEstate.MemeFactory);

  const dogeCount = useGameStore((state) => state.dogecoin);
  const sendTweet = useGameStore((state) => state.sendTweet);

  if (!hasFactory) return null;

  return (
    <div className="panel">
      <Header>
        <span className="colorful-text">Doge HQ</span>
      </Header>
      <div style={{ padding: 10 }}>
        <button
          onClick={() => {
            sendTweet();
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
