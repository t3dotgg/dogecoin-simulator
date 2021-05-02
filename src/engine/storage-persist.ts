import React from "react";
import { useGameStore } from "./game";
import { GAME_STORAGE_KEY } from "./types";

export const useStoragePersist = () => {
  const gameData = useGameStore();
  React.useEffect(() => {
    localStorage.setItem(GAME_STORAGE_KEY, JSON.stringify(gameData));
  }, [gameData.dogePerUSD]); // Key on dogePerUSD since this is on a timer
};
