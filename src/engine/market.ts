import create from "zustand";

const LAST_PRICE_KEY = "last-price";

type MarketState = {
  dogePerUSD: number;
  priceHistory: number[];
};

type MarketActions = {
  setRandomDogePrice: () => void;

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

const getRandomFluctuation = (currentVal: number) => {
  const delta = Math.random() * currentVal - currentVal / 2;

  return delta + Math.random() * 2; // Add a slight boost to keep price from getting stuck too low
};

export const useMarketStorage = create<MarketState & MarketActions>((set) => ({
  ...defaultState(),
  setRandomDogePrice: () => {
    set((state) => {
      const price = state.dogePerUSD + getRandomFluctuation(state.dogePerUSD);
      const normalizedPrice = price > 1 ? price : 1;

      localStorage.setItem(LAST_PRICE_KEY, normalizedPrice.toString());

      return {
        dogePerUSD: normalizedPrice,
        priceHistory: [...state.priceHistory, normalizedPrice],
      };
    });
  },
  resetMarketPrice: () =>
    set(() => ({ dogePerUSD: generateRandomPrice(), priceHistory: [] })),
}));
