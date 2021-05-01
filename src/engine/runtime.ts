import { useGameStore } from "./game";
import { useEffect } from "react";

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
  const setRandomDogePrice = useGameStore((state) => state.setRandomDogePrice);
  const ticks = useGameStore((state) => state.ticks);
  const phase = useGameStore((state) => state.phase);

  useEffect(() => {
    if (ticks % 200 === 0) {
      setRandomDogePrice(phase);
    }
  }, [ticks]);
};
