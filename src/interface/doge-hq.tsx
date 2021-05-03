import React from "react";
import { Header } from "../common/header";
import { ASTRONAUT_SALARY, ENGINEER_SALARY } from "../data/config";
import { useGameStore } from "../engine/game";
import { RealEstate, Unlocks } from "../engine/types";

export const DogeHQ: React.FC = () => {
  const realEstate = useGameStore((state) => state.realEstate);
  const hasFactory = realEstate.includes(RealEstate.MemeFactory);

  const usd = useGameStore((state) => state.usd);
  const doge = useGameStore((state) => state.dogecoin);
  const spendUSD = useGameStore((state) => state.spendUSD);
  const spendDoge = useGameStore((state) => state.spendCoin);
  const unlocks = useGameStore((state) => state.unlocks);
  const unlockNewThing = useGameStore((state) => state.unlockSomething);

  const engineers = useGameStore((state) => state.engineers);
  const astronauts = useGameStore((state) => state.astronauts);
  const currentMission = useGameStore((state) => state.currentMission);

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
              spendDoge(1000000);
            }}
            disabled={doge < 1000000}
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "nowrap",
            }}
          >
            Hire Social Media Manager (1,000,000 Doge)
          </button>
        </div>
      )}
      {(hasSocialMediaManager || hasIncoroprated) && (
        <div style={{ padding: 10 }}>
          <div style={{ fontWeight: "bold" }}>Employees</div>
          {hasSocialMediaManager && (
            <div style={{ marginTop: 10 }}>1 Social Media Manager</div>
          )}
          {currentMission === "To The Moon" && (
            <>
              <div>{engineers} Engineers</div>
              <div>{astronauts} Astronauts</div>
            </>
          )}
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
  const usd = useGameStore((state) => state.usd);

  const hireEngineer = useGameStore((state) => state.hireEngineer);
  const hireAstronaut = useGameStore((state) => state.hireAstronaut);

  if (phase < 4 || !currentMission) return null;

  return (
    <div style={{ paddingLeft: 10, paddingBottom: 10 }}>
      <div style={{ fontWeight: "bold" }}>Hiring Board</div>
      <button disabled={usd < ENGINEER_SALARY} onClick={hireEngineer}>
        Hire Engineer (${ENGINEER_SALARY.toLocaleString("en")})
      </button>
      <button disabled={usd < ASTRONAUT_SALARY} onClick={hireAstronaut}>
        Hire Astronaut (${ASTRONAUT_SALARY.toLocaleString("en")})
      </button>
    </div>
  );
};
