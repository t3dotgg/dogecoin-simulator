import create from "zustand";

const LAST_PRICE_KEY = "last-price";

type MarketState = {
  dogePerUSD: number;
  priceHistory: number[];
};

type MarketActions = {
  setRandomDogePrice: () => void;
};

const defaultState: () => MarketState = () => {
  const storedLastPrice = localStorage.getItem(LAST_PRICE_KEY);
  return {
    dogePerUSD: storedLastPrice
      ? parseInt(storedLastPrice)
      : Math.random() * 1000 + 1000,
    priceHistory: [],
  };
};

const getRandomFluctuation = (currentVal: number) => {
  const delta = currentVal / 2;

  return Math.random() * currentVal - delta;
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
}));
