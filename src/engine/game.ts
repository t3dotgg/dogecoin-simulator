import createStore from "zustand";
import { GAME_STORAGE_KEY } from "./types";

export type GameState = {
  ticks: number;

  // Currency
  dogecoin: number;
  usd: number;

  // Purchases
  smallMiners: number;
  mediumMiners: number;
  largeMiners: number;
};

export type GameActions = {
  runTick: () => void;

  addCoin: (coin: number) => void;
  spendCoin: (coin: number) => void;

  addUSD: (USD: number) => void;
  spendUSD: (USD: number) => void;

  buySmallMiner: () => void;
  buyMediumMiner: () => void;
  buyLargeMiner: () => void;
};

const defaultState: GameState = {
  ticks: 0,

  dogecoin: 0,
  usd: 1000,

  smallMiners: 0,
  mediumMiners: 0,
  largeMiners: 0,
};

const loadGame = () => {
  const stored = localStorage.getItem(GAME_STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored) as GameState;
  }

  return defaultState;
};

export type GameStore = GameState & GameActions;

export const useGameStore = createStore<GameStore>((set) => ({
  ...loadGame(),

  addCoin: (coin) => set((state) => ({ dogecoin: state.dogecoin + coin })),
  spendCoin: (coin) => set((state) => ({ dogecoin: state.dogecoin - coin })),
  addUSD: (usd) => set((state) => ({ usd: state.usd + usd })),
  spendUSD: (usd) => set((state) => ({ usd: state.usd - usd })),

  runTick: () =>
    set((state) => {
      return {
        dogecoin: state.dogecoin + calculateHashRate(state) / 10,
        ticks: state.ticks + 1,
      };
    }),

  // Miner purchasing
  buySmallMiner: () =>
    set((state) => ({
      smallMiners: state.smallMiners + 1,
      usd: state.usd - 50,
    })),
  buyMediumMiner: () =>
    set((state) => ({
      mediumMiners: state.mediumMiners + 1,
      usd: state.usd - 200,
    })),
  buyLargeMiner: () =>
    set((state) => ({
      largeMiners: state.largeMiners + 1,
      usd: state.usd - 500,
    })),
}));

const calculateHashRate = (store: GameState) => {
  return (
    store.smallMiners * 1 + store.mediumMiners * 5 + store.largeMiners * 25
  );
};

export const useHashRate = () =>
  useGameStore((state) => calculateHashRate(state));
