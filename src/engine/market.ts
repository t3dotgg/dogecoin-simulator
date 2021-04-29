import create from "zustand";

type MarketState = {
  dogePerUSD: number;
};

const defaultState: MarketState = {
  dogePerUSD: Math.random() * 1000 + 1000,
};

export const useMarketStorage = create<MarketState>((set) => ({
  ...defaultState,
}));
