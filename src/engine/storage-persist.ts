import React from "react";
import { useGameStore } from "./game";
import { GAME_STORAGE_KEY } from "./types";

export const useStoragePersist = () => {
  const [
    dogecoin,
    smallMiners,
    mediumMiners,
    largeMiners,
    hashRate,
  ] = useGameStore((state) => [
    state.dogecoin,
    state.smallMiners,
    state.mediumMiners,
    state.largeMiners,
    state.hashRate,
  ]);
  React.useEffect(() => {
    localStorage.setItem(
      GAME_STORAGE_KEY,
      JSON.stringify({
        dogecoin,
        smallMiners,
        mediumMiners,
        largeMiners,
        hashRate,
      })
    );
  }, [dogecoin]);
};
