const LAST_PRICE_KEY = "last-price";

export type MarketState = {
  dogePerUSD: number;
  priceHistory: number[];
};

export type MarketActions = {
  setRandomDogePrice: (phase: number) => void;

  resetMarketPrice: () => void;
};

export const generateRandomPrice = () => Math.random() * 10000 + 10000;

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

type FluctuationConfig = {
  isLuckEnabled?: boolean;
};

export const getRandomFluctuation = (
  currentVal: number,
  phase: number,
  options: FluctuationConfig
) => {
  const wall = wallByPhase[phase];

  // Skip luck if past wall
  if (options.isLuckEnabled && currentVal > wall) {
    const goodLuck = Math.random() > 0.97;

    // Good luck path
    if (goodLuck) {
      const moveRange = currentVal * 0.5; // Random range: 50%
      const delta = Math.random() * moveRange + currentVal * 0.3; // Total range: random * 50% + 30%, 30% to 80%
      return 0 - delta;
    }

    const badLuck = Math.random() > 0.99;

    // Bad luck path
    if (badLuck) {
      const moveRange = currentVal; // Random range: 100%
      const delta = Math.random() * moveRange + currentVal * 0.5; // Total range: random * 100% + 50%, 50% to 150%
      return delta;
    }
  }

  const moveRange = currentVal * 0.1; // Random range: 10%
  const delta = Math.random() * moveRange - moveRange / 2; // Total range: random * 10% - 5%, -5% to 5%

  if (wall > currentVal) {
    // Pricing is too good, artificially fuck it up
    return delta + (Math.random() * wallByPhase[phase]) / 2;
  }

  return delta;
};
