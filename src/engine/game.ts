import createStore from "zustand";
import {
  MarketState,
  defaultMarketState,
  getRandomFluctuation,
  generateRandomPrice,
  MarketActions,
} from "./market";
import { GAME_STORAGE_KEY, RealEstate } from "./types";

type CoreGameState = {
  ticks: number;
  phase: number;

  // Currency
  dogecoin: number;
  usd: number;
  maxDogecoin: number; // Peak dogecoin had thusfar (pseudo-progress marker)

  // Purchases
  smallMiners: number;
  mediumMiners: number;
  largeMiners: number;

  realEstate: RealEstate[];
};

export type GameState = CoreGameState & MarketState;

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

  acquireProperty: (property: RealEstate) => void;
};

const defaultState: GameState = {
  ticks: 0,
  phase: 1,

  dogecoin: 0,
  usd: 200,
  maxDogecoin: 0,

  smallMiners: 0,
  mediumMiners: 0,
  largeMiners: 0,

  realEstate: [],

  // Market stuff
  ...defaultMarketState(),
};

const loadGame = () => {
  const stored = localStorage.getItem(GAME_STORAGE_KEY);
  if (stored) {
    const result = JSON.parse(stored) as Partial<GameState>;
    return { ...defaultState, ...result };
  }

  return defaultState;
};

export type GameStore = GameState & GameActions & MarketActions;

export const useGameStore = createStore<GameStore>((set) => ({
  ...loadGame(),

  resetToDefault: () => set(defaultState),

  addCoin: (coin) => set((state) => ({ dogecoin: state.dogecoin + coin })),
  spendCoin: (coin) => set((state) => ({ dogecoin: state.dogecoin - coin })),
  addUSD: (usd) => set((state) => ({ usd: state.usd + usd })),
  spendUSD: (usd) => set((state) => ({ usd: state.usd - usd })),

  runTick: () =>
    set((state) => {
      const newDogeCount = state.dogecoin + calculateHashRate(state) / 10;
      const sharedUpdate = {
        dogecoin: newDogeCount,
        ticks: state.ticks + 1,
        maxDogecoin: Math.max(newDogeCount, state.maxDogecoin),
      };
      if (state.phase < 2 && state.dogecoin >= 500000) {
        return { ...sharedUpdate, phase: 2 };
      }
      if (
        state.phase < 3 &&
        state.dogecoin >= 1000000 &&
        state.realEstate.length >= 3
      ) {
        return { ...sharedUpdate, phase: 3 };
      }
      if (state.phase < 4 && state.dogecoin > 10000000) {
        return { ...sharedUpdate, phase: 4 };
      }
      return {
        ...sharedUpdate,
        phase: state.phase,
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

  // Real Estate purchases
  acquireProperty: (property) =>
    set((state) => ({ realEstate: [...state.realEstate, property] })),

  // Market bs
  setRandomDogePrice: (phase: number) => {
    set((state) => {
      const price =
        state.dogePerUSD +
        getRandomFluctuation(state.dogePerUSD, phase, {
          // Enable ticks after 10 minutes
          isLuckEnabled: state.phase > 1,
        });

      return {
        dogePerUSD: price,
        priceHistory: [...state.priceHistory, price],
      };
    });
  },
  resetMarketPrice: () =>
    set(() => ({ dogePerUSD: generateRandomPrice(), priceHistory: [] })),
}));

const calculateHashRate = (store: GameState) => {
  return (
    (store.smallMiners * 5 + store.mediumMiners * 25 + store.largeMiners * 70) *
    (store.realEstate.includes(RealEstate.Server) ? 1.3 : 1)
  );
};

export const useHashRate = () =>
  useGameStore((state) => calculateHashRate(state));
