import { useGameStore } from "./game";
import { useEffect } from "react";
import { useMarketStorage } from "./market";

export const useGameRunner = () => {
  const gameStore = useGameStore();

  // Runs timers
  useEffect(() => {
    const currentUpdater = setInterval(() => {
      gameStore.runTick();
    }, 10);

    return () => clearInterval(currentUpdater);
  }, []);
};

export const useMarketRunner = () => {
  const marketStore = useMarketStorage();
  const ticks = useGameStore((state) => state.ticks);

  useEffect(() => {
    if (ticks % 200 === 0) {
      marketStore.setRandomDogePrice();
    }
  }, [ticks]);
};
