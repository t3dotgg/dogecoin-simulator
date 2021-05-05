import React from "react";
import { DogeIcon } from "../common/dogeicon";
import { Header } from "../common/header";
import { useGameStore } from "../engine/game";
import { DogePriceChart } from "../common/doge-chart";

const buyButton1Amount = 10;
const buyButton1Guard = (amount: number) => amount < 100000;
const buyButton2Amount = 100;
const buyButton2Guard = (amount: number) => amount > 1000;
const buyButton3Amount = 1000;
const buyButton3Guard = (amount: number) => amount > 100000;

const sellButton1Amount = 10000;
const sellButton1Guard = (amount: number) => amount < 100000000;
const sellButton2Amount = 100000;
const sellButton2Guard = (amount: number) => amount > 1000000;
const sellButton3Amount = 1000000;
const sellButton3Guard = (amount: number) => amount > 100000000;

export const DogeBase: React.FC = () => {
  const gameStore = useGameStore();

  return (
    <div className="panel">
      <Header>Dogebase™</Header>
      <div
        style={{
          padding: 10,
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            paddingBottom: 10,
            display: "flex",
            alignItems: "center",
          }}
        >
          DOGE per USD:
          <div
            style={{
              fontFamily: "Comic Mono",
              paddingLeft: "0.5rem",
              display: "flex",
              alignItems: "Center",
            }}
          >
            {gameStore.dogePerUSD.toFixed(2)}
            <DogeIcon />
          </div>
        </div>
        <div
          style={{
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
          }}
        >
          USD per DOGE:
          <div
            style={{
              fontFamily: "Comic Mono",
              paddingLeft: "0.5rem",
              display: "flex",
              alignItems: "Center",
            }}
          >
            ${(1 / gameStore.dogePerUSD).toFixed(5)}
          </div>
        </div>
        <DogePriceChart />
        <div style={{ display: "flex", flexDirection: "column" }}>
          {buyButton1Guard(gameStore.maxUsd) && (
            <button
              onClick={() => {
                gameStore.addCoin(gameStore.dogePerUSD * buyButton1Amount);
                gameStore.spendUSD(buyButton1Amount);
              }}
              disabled={gameStore.usd < buyButton1Amount}
            >
              Buy ${buyButton1Amount} of doge (
              {(gameStore.dogePerUSD * buyButton1Amount).toFixed(2)})
            </button>
          )}
          {buyButton2Guard(gameStore.maxUsd) && (
            <button
              onClick={() => {
                gameStore.addCoin(gameStore.dogePerUSD * buyButton2Amount);
                gameStore.spendUSD(buyButton2Amount);
              }}
              disabled={gameStore.usd < buyButton2Amount}
            >
              Buy ${buyButton2Amount} of doge <br />(
              {(
                gameStore.dogePerUSD * buyButton2Amount
              ).toLocaleString(undefined, { maximumFractionDigits: 2 })}
              )
            </button>
          )}
          {buyButton3Guard(gameStore.maxUsd) && (
            <button
              onClick={() => {
                gameStore.addCoin(gameStore.dogePerUSD * buyButton3Amount);
                gameStore.spendUSD(buyButton3Amount);
              }}
              disabled={gameStore.usd < buyButton3Amount}
            >
              Buy ${buyButton3Amount.toLocaleString()} of doge <br />(
              {(
                gameStore.dogePerUSD * buyButton3Amount
              ).toLocaleString(undefined, { maximumFractionDigits: 2 })}
              )
            </button>
          )}
          {/* Hide at > 100m */}
          {sellButton1Guard(gameStore.maxDogecoin) && (
            <button
              onClick={() => {
                gameStore.spendCoin(sellButton1Amount);
                gameStore.addUSD(sellButton1Amount / gameStore.dogePerUSD);
              }}
              disabled={gameStore.dogecoin < sellButton1Amount}
            >
              Sell {sellButton1Amount.toLocaleString()} doge ($
              {(sellButton1Amount / gameStore.dogePerUSD).toFixed(2)})
            </button>
          )}
          {/* Show at > 1m */}
          {sellButton2Guard(gameStore.maxDogecoin) && (
            <button
              onClick={() => {
                gameStore.spendCoin(sellButton2Amount);
                gameStore.addUSD(sellButton2Amount / gameStore.dogePerUSD);
              }}
              disabled={gameStore.dogecoin < sellButton2Amount}
            >
              Sell {sellButton2Amount.toLocaleString()} doge <br />
              ($
              {(sellButton2Amount / gameStore.dogePerUSD).toFixed(2)})
            </button>
          )}
          {/* Show at > 100m */}
          {sellButton3Guard(gameStore.maxDogecoin) && (
            <button
              onClick={() => {
                gameStore.spendCoin(sellButton3Amount);
                gameStore.addUSD(sellButton3Amount / gameStore.dogePerUSD);
              }}
              disabled={gameStore.dogecoin < sellButton3Amount}
            >
              Sell {sellButton3Amount.toLocaleString()} doge ($
              {(sellButton3Amount / gameStore.dogePerUSD).toFixed(2)})
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
