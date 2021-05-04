import React from "react";
import { VictoryAxis, VictoryChart, VictoryLine } from "victory";
import { useGameStore } from "../engine/game";

export const DogePriceChart: React.FC<{ width?: number }> = (props) => {
  const marketStore = useGameStore();

  return (
    <VictoryChart
      width={props.width}
      padding={{ left: 60, right: 60, top: 50, bottom: 50 }}
    >
      <VictoryLine
        style={{
          data: { stroke: "#FFD700", strokeWidth: 5 },
        }}
        data={marketStore.priceHistory.map((dogePerUSD, index) => {
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
        tickFormat={(tick) => {
          if (tick < 1000) return tick;
          return Math.round(tick / 100) / 10 + "k";
        }}
      />
    </VictoryChart>
  );
};
