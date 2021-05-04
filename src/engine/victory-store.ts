const VICTORY_STORE_KEY = "victory-storage";

type Victory = {
  date: string;
  ticks: number;
  maxDoge: number;
  failures: number;
  casualties: number;
};

export const getVictoryStorage: () => Victory[] = () => {
  const stored = localStorage.getItem(VICTORY_STORE_KEY);
  return stored ? (JSON.parse(stored) as Victory[]) : [];
};

export const addVictory: (newVictory: Victory) => void = (victory) => {
  const stored = getVictoryStorage();
  localStorage.setItem(VICTORY_STORE_KEY, JSON.stringify([...stored, victory]));
};
