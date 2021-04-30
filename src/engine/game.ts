import createStore from "zustand";
import { GAME_STORAGE_KEY } from "./types";

export type GameState = {
  ticks: number;
  phase: number;

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
  resetToDefault: () => void;

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
  phase: 1,

  dogecoin: 0,
  usd: 100,

  smallMiners: 0,
  mediumMiners: 0,
  largeMiners: 0,
};

const loadGame = () => {
  const stored = localStorage.getItem(GAME_STORAGE_KEY);
  if (stored) {
    const result = JSON.parse(stored) as Partial<GameState>;
    return { ...defaultState, ...result };
  }

  return defaultState;
};

export type GameStore = GameState & GameActions;

export const useGameStore = createStore<GameStore>((set) => ({
  ...loadGame(),

  resetToDefault: () => set(defaultState),

  addCoin: (coin) => set((state) => ({ dogecoin: state.dogecoin + coin })),
  spendCoin: (coin) => set((state) => ({ dogecoin: state.dogecoin - coin })),
  addUSD: (usd) => set((state) => ({ usd: state.usd + usd })),
  spendUSD: (usd) => set((state) => ({ usd: state.usd - usd })),

  runTick: () =>
    set((state) => {
      return {
        dogecoin: state.dogecoin + calculateHashRate(state) / 100,
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
    store.smallMiners * 5 + store.mediumMiners * 25 + store.largeMiners * 70
  );
};

export const useHashRate = () =>
  useGameStore((state) => calculateHashRate(state));
