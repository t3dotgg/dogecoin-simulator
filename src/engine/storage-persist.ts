import React from "react";
import { useGameStore } from "./game";
import { GAME_STORAGE_KEY } from "./types";

export const useStoragePersist = () => {
  const gameData = useGameStore();
  React.useEffect(() => {
    console.log("updating storage");
    localStorage.setItem(GAME_STORAGE_KEY, JSON.stringify(gameData));
  }, [gameData.dogecoin, gameData.usd, gameData.dogePerUSD]);
};
