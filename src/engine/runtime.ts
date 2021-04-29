import { useGameStore } from "./game";
import { useEffect } from "react";
import { useMarketStorage } from "./market";

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

export const useMarketRunner = () => {
  const marketStore = useMarketStorage();
  const ticks = useGameStore((state) => state.ticks);

  useEffect(() => {
    if (ticks % 20 === 0) {
      marketStore.setRandomDogePrice();
    }
  }, [ticks]);
};
