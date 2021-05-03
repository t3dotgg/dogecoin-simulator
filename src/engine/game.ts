import createStore from "zustand";
import { combine } from "zustand/middleware";
import {
  MarketState,
  defaultMarketState,
  getRandomFluctuation,
  generateRandomPrice,
  MarketActions,
} from "./market";
import { CurrentMission, GAME_STORAGE_KEY, RealEstate, Unlocks } from "./types";
import { GeneratedTweets } from "../data/tweets";
import { ASTRONAUT_SALARY, ENGINEER_SALARY } from "../data/config";

type CoreGameState = {
  ticks: number;
  phase: number;
  luck: number;

  // Currency
  dogecoin: number;
  usd: number;
  maxDogecoin: number; // Peak dogecoin had thusfar (pseudo-progress marker)

  // Purchases
  smallMiners: number;
  mediumMiners: number;
  largeMiners: number;

  // Inventory
  realEstate: RealEstate[];
  unlocks: Unlocks[];

  // Twitter
  tweetCount: number;
  twitterFollowers: number;
  tweetIDs: number[];

  // Missions
  currentMission: CurrentMission;

  // Moon Mission Numbers
  engineers: number;
  astronauts: number;
  successChance: number;
  minerAllocation: number;
};

export type GameState = CoreGameState & MarketState;

const defaultState: GameState = {
  ticks: 0,
  phase: 1,
  luck: 0,

  dogecoin: 0,
  usd: 200,
  maxDogecoin: 0,

  smallMiners: 0,
  mediumMiners: 0,
  largeMiners: 0,

  realEstate: [],
  unlocks: [],

  tweetCount: 0,
  twitterFollowers: 0,
  tweetIDs: [],

  // Market stuff
  ...defaultMarketState(),

  // Mission stuff
  currentMission: null,
  engineers: 0,
  astronauts: 0,
  successChance: 0,
  minerAllocation: 0,
};

const loadGame = () => {
  const stored = localStorage.getItem(GAME_STORAGE_KEY);
  if (stored) {
    const result = JSON.parse(stored) as Partial<GameState>;
    return { ...defaultState, ...result };
  }

  return defaultState;
};

export const useGameStore = createStore(
  combine(loadGame(), (set) => ({
    resetToDefault: () => set(defaultState),

    addCoin: (coin: number) =>
      set((state) => ({ dogecoin: state.dogecoin + coin })),
    spendCoin: (coin: number) =>
      set((state) => ({ dogecoin: state.dogecoin - coin })),
    addUSD: (usd: number) => set((state) => ({ usd: state.usd + usd })),
    spendUSD: (usd: number) => set((state) => ({ usd: state.usd - usd })),

    addToLuck: (luck: number) => set((state) => ({ luck: state.luck + luck })),
    addToTweetCount: (tweets: number) =>
      set((state) => ({ tweetCount: state.tweetCount + tweets })),

    runTick: () =>
      set((state) => {
        const newDogeCount = state.dogecoin + calculateHashRate(state) / 10;
        const sharedUpdate = {
          dogecoin: newDogeCount,
          ticks: state.ticks + 1,
          maxDogecoin: Math.max(newDogeCount, state.maxDogecoin),
          successChance:
            state.currentMission === "To The Moon"
              ? state.successChance + calculateResearchRate(state) / 10
              : 0,
        };
        if (state.phase < 2 && state.dogecoin >= 500000) {
          return { ...sharedUpdate, phase: 2 };
        }
        if (
          state.phase < 3 &&
          state.dogecoin >= 1000000 &&
          state.realEstate.length > 2
        ) {
          return { ...sharedUpdate, phase: 3 };
        }
        if (
          state.phase < 4 &&
          state.dogecoin > 10000000 &&
          state.unlocks.includes(Unlocks.SocialMediaManager) &&
          state.unlocks.includes(Unlocks.Incorporate)
        ) {
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
        usd: state.usd - getSmallMinerPrice(state.smallMiners),
      })),
    buyMediumMiner: () =>
      set((state) => ({
        mediumMiners: state.mediumMiners + 1,
        usd: state.usd - getMediumMinerPrice(state.mediumMiners),
      })),
    buyLargeMiner: () =>
      set((state) => ({
        largeMiners: state.largeMiners + 1,
        usd: state.usd - getLargeMinerPrice(state.largeMiners),
      })),

    sendTweet: () => {
      set((state) => {
        const coin = state.dogecoin - 50000;
        const luckyNumber = Math.random();

        let luck = state.luck;
        let followers = state.twitterFollowers;

        if (luckyNumber > 0.7) {
          followers = Math.floor(
            followers + Math.random() * 0.1 * followers + Math.random() * 10
          );
          if (followers > 100) {
            luck += 1;
          }
        }
        if (luckyNumber < 0.2) {
          followers = Math.floor(followers - Math.random() * 0.05 * followers);
          if (followers > 100) {
            luck -= 1;
          }
        }
        const tweetIDs = [
          Math.floor(Math.random() * GeneratedTweets.length),
          ...state.tweetIDs,
        ];

        return {
          dogecoin: coin,
          luck,
          twitterFollowers: followers,
          tweetCount: state.tweetCount + 1,
          tweetIDs,
        };
      });
    },

    // Real Estate purchases
    acquireProperty: (property: RealEstate) =>
      set((state) => ({ realEstate: [...state.realEstate, property] })),
    // Other unlocks
    unlockSomething: (newUnlock: Unlocks) =>
      set((state) => ({ unlocks: [...state.unlocks, newUnlock] })),

    // Market bs
    setRandomDogePrice: () => {
      set((state) => {
        const price =
          state.dogePerUSD +
          getRandomFluctuation(state.dogePerUSD, state.phase, {
            // Enable ticks after 10 minutes
            isLuckEnabled: state.phase > 1,
            currentLuck: state.luck,
          });

        const luck =
          state.luck === 0
            ? 0
            : state.luck > 0
            ? state.luck - 1
            : state.luck + 1;

        const history = state.priceHistory.slice(
          Math.max(state.priceHistory.length - 30, 0)
        );
        return {
          dogePerUSD: price,
          priceHistory: [...history, price],
          luck,
        };
      });
    },

    setCurrentMission: (mission: CurrentMission) =>
      set(() => ({ currentMission: mission })),
    setMinerAllocation: (alloc: number) =>
      set(() => ({ minerAllocation: alloc })),

    hireAstronaut: () =>
      set((state) => ({
        astronauts: state.astronauts + 1,
        usd: state.usd - ASTRONAUT_SALARY,
      })),
    hireEngineer: () =>
      set((state) => ({
        engineers: state.engineers + 1,
        usd: state.usd - ENGINEER_SALARY,
      })),

    resetMarketPrice: () =>
      set(() => ({ dogePerUSD: generateRandomPrice(), priceHistory: [] })),
  }))
);

const calculateHashRate = (store: GameState) => {
  return (
    (store.smallMiners * 5 + store.mediumMiners * 25 + store.largeMiners * 70) *
    (store.realEstate.includes(RealEstate.Server) ? 1.3 : 1) *
    (1 - store.minerAllocation)
  );
};

const researchFlattener = 0.0000001;

const engFactor = 0.1;

const calculateResearchRate = (store: GameState) => {
  return (
    (store.smallMiners * 1 + store.mediumMiners * 5 + store.largeMiners * 15) *
    (store.realEstate.includes(RealEstate.Server) ? 1.3 : 1) *
    researchFlattener *
    (store.engineers * engFactor + 1) *
    store.minerAllocation
  );
};

export const getSmallMinerPrice = (smallMinerCount: number) =>
  Math.floor(Math.pow(1.35, smallMinerCount) - 1 + 50);
export const getMediumMinerPrice = (mediumMinerCount: number) =>
  Math.floor(Math.pow(1.4, mediumMinerCount) - 1 + 200);
export const getLargeMinerPrice = (largeMinerCount: number) =>
  Math.floor(Math.pow(1.45, largeMinerCount) - 1 + 500);

export const useHashRate = () =>
  useGameStore((state) => calculateHashRate(state));

export const useResearchRate = () =>
  useGameStore((state) => calculateResearchRate(state));
