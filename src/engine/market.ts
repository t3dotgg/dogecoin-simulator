import create from "zustand";

const LAST_PRICE_KEY = "last-price";

type MarketState = {
  dogePerUSD: number;
  priceHistory: number[];
};

type MarketActions = {
  setRandomDogePrice: (phase: number) => void;

  resetMarketPrice: () => void;
};

const generateRandomPrice = () => Math.random() * 1000 + 1000;

const defaultState: () => MarketState = () => {
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

const getRandomFluctuation = (currentVal: number, phase: number) => {
  const moveRange = currentVal * 0.6;
  const delta = Math.random() * moveRange - moveRange / 2;

  const wall = wallByPhase[phase];

  if (wall > currentVal) {
    // Pricing is too good, artificially fuck it up
    return delta + (Math.random() * wallByPhase[phase]) / 2;
  }

  return delta;
};

export const useMarketStorage = create<MarketState & MarketActions>((set) => ({
  ...defaultState(),
  setRandomDogePrice: (phase: number) => {
    set((state) => {
      const price =
        state.dogePerUSD + getRandomFluctuation(state.dogePerUSD, phase);

      localStorage.setItem(LAST_PRICE_KEY, price.toString());

      return {
        dogePerUSD: price,
        priceHistory: [...state.priceHistory, price],
      };
    });
  },
  resetMarketPrice: () =>
    set(() => ({ dogePerUSD: generateRandomPrice(), priceHistory: [] })),
}));
