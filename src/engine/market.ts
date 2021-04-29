import create from "zustand";

type MarketState = {
  dogePerUSD: number;
};

type MarketActions = {
  setRandomDogePrice: () => void;
};

const defaultState: MarketState = {
  dogePerUSD: Math.random() * 1000 + 1000,
};

const getRandomFluctuation = () => Math.random() * 500 - 250;

export const useMarketStorage = create<MarketState & MarketActions>((set) => ({
  ...defaultState,
  setRandomDogePrice: () => {
    set((state) => {
      const price = state.dogePerUSD + getRandomFluctuation();
      return {
        dogePerUSD: price > 0 ? price : 10,
      };
    });
  },
}));
