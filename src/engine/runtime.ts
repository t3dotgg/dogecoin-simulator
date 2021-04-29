import { useGameStore } from "./game";
import { useEffect } from "react";

export const useGameRunner = () => {
  const gameStore = useGameStore();

  // Runs timers
  useEffect(() => {
    const currentUpdater = setInterval(() => {
      gameStore.runTick();
    }, 100);

    return () => clearInterval(currentUpdater);
  }, []);
};
