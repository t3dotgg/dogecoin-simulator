const LAST_PRICE_KEY = "last-price";

export type MarketState = {
  dogePerUSD: number;
  priceHistory: number[];
};

export type MarketActions = {
  setRandomDogePrice: (phase: number) => void;

  resetMarketPrice: () => void;
};

export const generateRandomPrice = () => Math.random() * 1000 + 1000;

export const defaultMarketState: () => MarketState = () => {
  const storedLastPrice = localStorage.getItem(LAST_PRICE_KEY);
  return {
    dogePerUSD: storedLastPrice
      ? parseInt(storedLastPrice)
      : generateRandomPrice(),
    priceHistory: [],
  };
};

// Current "wall" values used as a boost to keep prices from getting too good too early
const wallByPhase = [0, 800, 400, 200, 100, 50, 25];

export const getRandomFluctuation = (currentVal: number, phase: number) => {
  const moveRange = currentVal * 0.6;
  const delta = Math.random() * moveRange - moveRange / 2;

  const wall = wallByPhase[phase];

  if (wall > currentVal) {
    // Pricing is too good, artificially fuck it up
    return delta + (Math.random() * wallByPhase[phase]) / 2;
  }

  return delta;
};
