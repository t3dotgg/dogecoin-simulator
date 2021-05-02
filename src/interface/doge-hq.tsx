import React from "react";
import { Header } from "../common/header";
import { useGameStore } from "../engine/game";
import { RealEstate, Unlocks } from "../engine/types";

export const DogeHQ: React.FC = () => {
  const realEstate = useGameStore((state) => state.realEstate);
  const hasFactory = realEstate.includes(RealEstate.MemeFactory);

  const usd = useGameStore((state) => state.usd);
  const unlocks = useGameStore((state) => state.unlocks);
  const unlockNewThing = useGameStore((state) => state.unlockSomething);

  if (!hasFactory) return null;

  const hasSocialMediaManager = unlocks.includes(Unlocks.SocialMediaManager);

  return (
    <div className="panel">
      <Header>
        <span className="colorful-text">Doge HQ</span>
      </Header>
      {!hasSocialMediaManager && (
        <div style={{ padding: 10 }}>
          <button
            onClick={() => {
              unlockNewThing(Unlocks.SocialMediaManager);
            }}
            disabled={usd < 30000}
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "nowrap",
            }}
          >
            Hire Social Media Manager ($30,000)
          </button>
        </div>
      )}
      {hasSocialMediaManager && (
        <div style={{ padding: 10 }}>
          <div style={{ fontWeight: "bold" }}>Employees</div>
          <div style={{ marginTop: 10 }}>1 Social Media Manager</div>
        </div>
      )}
    </div>
  );
};
