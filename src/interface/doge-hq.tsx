import React from "react";
import { Header } from "../common/header";
import { useGameStore } from "../engine/game";
import { RealEstate, Unlocks } from "../engine/types";

export const DogeHQ: React.FC = () => {
  const realEstate = useGameStore((state) => state.realEstate);
  const hasFactory = realEstate.includes(RealEstate.MemeFactory);

  const usd = useGameStore((state) => state.usd);
  const spendUSD = useGameStore((state) => state.spendUSD);
  const unlocks = useGameStore((state) => state.unlocks);
  const unlockNewThing = useGameStore((state) => state.unlockSomething);

  if (!hasFactory) return null;

  const hasSocialMediaManager = unlocks.includes(Unlocks.SocialMediaManager);
  const hasIncoroprated = unlocks.includes(Unlocks.Incorporate);

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
              spendUSD(30000);
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
      {!hasIncoroprated && (
        <div style={{ padding: 10 }}>
          <button
            onClick={() => {
              unlockNewThing(Unlocks.Incorporate);
              spendUSD(100000);
            }}
            disabled={usd < 100000}
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "nowrap",
            }}
          >
            Incorporate ($100,000)
          </button>
        </div>
      )}
      <HiringBoard />
    </div>
  );
};

const HiringBoard: React.FC = () => {
  const phase = useGameStore((state) => state.phase);
  const currentMission = useGameStore((state) => state.currentMission);

  if (phase < 4 || !currentMission) return null;

  return (
    <div style={{ paddingLeft: 10, paddingBottom: 10 }}>
      <div style={{ fontWeight: "bold" }}>Hiring Board</div>
      <button>Hire Engineer ($40,000)</button>
      <button>Hire Astronaut ($100,000)</button>
    </div>
  );
};
