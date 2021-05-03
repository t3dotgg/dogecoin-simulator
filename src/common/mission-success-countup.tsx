import React from "react";
import { CountUp } from "countup.js";

export const MissionSuccessCountup: React.FC<{ successPercentage: number }> = ({
  successPercentage,
}) => {
  const [counter, updateCounter] = React.useState<CountUp | undefined>();

  React.useEffect(() => {
    if (counter) {
      counter.update(successPercentage);
      return;
    }
    const newCounter = new CountUp("success-percent", successPercentage, {
      startVal: successPercentage,
      formattingFn: (num) => num.toFixed(8) + "%",
      decimalPlaces: 8,
      duration: 0.1,
    });

    updateCounter(newCounter);
  }, [successPercentage]);

  return <div style={{ fontFamily: "Comic Mono" }} id="success-percent" />;
};
