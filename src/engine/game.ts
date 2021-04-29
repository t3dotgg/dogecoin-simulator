import createStore from "zustand";

export type GameState = {
  dogecoin: number;

  hashRate: number;
  wattage: number;

  smallMiners: number;
  mediumMiners: number;
  largeMiners: number;
};

export type GameActions = {
  runTick: () => void;

  addCoin: (coin: number) => void;
  spendCoin: (coin: number) => void;

  addSmallMiner: () => void;
  addMediumMiner: () => void;
  addLargeMiner: () => void;

  updateHashRate: () => void;
};

const defaultState: GameState = {
  dogecoin: 500,

  hashRate: 0,
  wattage: 0,

  smallMiners: 0,
  mediumMiners: 0,
  largeMiners: 0,
};

export type GameStore = GameState & GameActions;

export const useGameStore = createStore<GameStore>((set) => ({
  ...defaultState,

  addCoin: (coin) => set((state) => ({ dogecoin: state.dogecoin + coin })),
  spendCoin: (coin) => set((state) => ({ dogecoin: state.dogecoin - coin })),
  runTick: () =>
    set((state) => ({ dogecoin: state.dogecoin + state.hashRate / 10 })),

  // Miner purchasing
  addSmallMiner: () => set((state) => ({ smallMiners: state.smallMiners + 1 })),
  addMediumMiner: () =>
    set((state) => ({ mediumMiners: state.mediumMiners + 1 })),
  addLargeMiner: () => set((state) => ({ largeMiners: state.largeMiners + 1 })),

  // Hash rate updater
  updateHashRate: () =>
    set((state) => ({ hashRate: calculateHashRate(state) })),
}));

const calculateHashRate = (store: GameState) => {
  return (
    store.smallMiners * 1 + store.mediumMiners * 5 + store.largeMiners * 25
  );
};
