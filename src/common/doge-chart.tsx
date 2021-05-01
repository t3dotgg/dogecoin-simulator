import React from "react";
import { VictoryAxis, VictoryChart, VictoryLine } from "victory";
import { useMarketStorage } from "../engine/market";

export const DogePriceChart: React.FC = () => {
  const marketStore = useMarketStorage();

  return (
    <VictoryChart>
      <VictoryLine
        style={{
          data: { stroke: "#FFD700", strokeWidth: 5 },
        }}
        data={marketStore.priceHistory
          .slice(Math.max(marketStore.priceHistory.length - 50, 0))
          .map((dogePerUSD, index) => {
            return { x: index, y: dogePerUSD };
          })}
      />
      <VictoryAxis
        style={{ tickLabels: { display: "none" }, axis: { strokeWidth: 2 } }}
      />
      <VictoryAxis
        dependentAxis
        tickCount={4}
        invertAxis
        style={{
          tickLabels: {
            fontFamily: "Comic Mono",
            fontSize: 15,
            fontWeight: "bold",
          },
          axis: { strokeWidth: 2 },
        }}
      />
    </VictoryChart>
  );
};
