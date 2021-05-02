import React from "react";
import { CountUp } from "countup.js";
import { usePrevious } from "./utils/use-previous";

export const DogeCounter: React.FC<{ dogecoin: number }> = ({ dogecoin }) => {
  const [counter, updateCounter] = React.useState<CountUp | undefined>();

  React.useEffect(() => {
    if (counter) {
      counter.update(dogecoin);
      return;
    }
    const newCounter = new CountUp("doge-counter", dogecoin, {
      startVal: dogecoin,
      duration: 0.1,
    });

    updateCounter(newCounter);
  }, [dogecoin]);

  return <div id="doge-counter" />;
};
