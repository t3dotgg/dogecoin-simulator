import React from "react";
import { useGameStore } from "./game";
import { GAME_STORAGE_KEY } from "./types";

export const useStoragePersist = () => {
  const [
    dogecoin,
    usd,
    smallMiners,
    mediumMiners,
    largeMiners,
    ticks,
    phase,
    realEstate,
  ] = useGameStore((state) => [
    state.dogecoin,
    state.usd,
    state.smallMiners,
    state.mediumMiners,
    state.largeMiners,
    state.ticks,
    state.phase,
    state.realEstate,
  ]);
  React.useEffect(() => {
    localStorage.setItem(
      GAME_STORAGE_KEY,
      JSON.stringify({
        dogecoin,
        usd,
        smallMiners,
        mediumMiners,
        largeMiners,
        ticks,
        phase,
        realEstate,
      })
    );
  }, [dogecoin]);
};
