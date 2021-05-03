import React from "react";
import { DogeCounter } from "../common/doge-countup";
import { Header } from "../common/header";
import { useGameStore, useHashRate } from "../engine/game";
import "../odometer.css";
import Modal from "react-modal";

const DogeIcon = () => (
  <img
    src="/assets/dogecoin-logo.png"
    style={{ height: "1rem", paddingRight: "0.5rem" }}
  />
);

export const MyStuff: React.FC = () => {
  const gameStore = useGameStore();
  const hashRate = useHashRate();

  const [isResetModalOpen, setResetModalOpen] = React.useState(false);

  return (
    <div className="panel my-panel">
      <Header>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Much Inventory
          <img
            src="/assets/reset-icon.png"
            style={{ height: "1rem" }}
            onClick={() => setResetModalOpen(true)}
          />
        </div>
      </Header>
      <Modal
        isOpen={isResetModalOpen}
        onRequestClose={() => setResetModalOpen(false)}
        ariaHideApp={false}
        style={{ content: { display: "flex", flexDirection: "column" } }}
      >
        <div style={{ width: "100%", textAlign: "center", fontSize: 20 }}>
          Are you sure you want to reset?
        </div>
        <div style={{ width: "100%", textAlign: "center", fontSize: 20 }}>
          (There's no way to undo this)
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 20,
          }}
        >
          <button
            onClick={() => {
              gameStore.resetToDefault();
              setResetModalOpen(false);
            }}
          >
            Yes, reset me!
          </button>
          <button onClick={() => setResetModalOpen(false)}>
            No, send me back!
          </button>
        </div>
      </Modal>
      <div
        style={{
          padding: 10,
          fontFamily: "Comic Mono",
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ paddingRight: "0.5rem" }}>Dogecoin:</div>
          <DogeCounter dogecoin={gameStore.dogecoin} />
          <DogeIcon />
        </div>
        <div
          style={{
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
          }}
        >
          USD: ${gameStore.usd.toFixed(2)}
        </div>

        {(gameStore.largeMiners > 0 ||
          gameStore.mediumMiners > 0 ||
          gameStore.smallMiners > 0) && (
          <>
            <div
              style={{
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                paddingTop: 10,
              }}
            >
              Mining Stuff
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              HASH RATE: {hashRate.toFixed(2)}{" "}
              <div style={{ paddingRight: "0.2rem" }} />
              <DogeIcon /> per sec
            </div>

            {gameStore.smallMiners > 0 && (
              <div>Crappy Miners: {gameStore.smallMiners}</div>
            )}
            {gameStore.mediumMiners > 0 && (
              <div>Decent Miners: {gameStore.mediumMiners}</div>
            )}
            {gameStore.largeMiners > 0 && (
              <div>Good Miners: {gameStore.largeMiners}</div>
            )}
          </>
        )}
        {gameStore.realEstate.length > 0 && (
          <>
            <div style={{ marginTop: 10, fontWeight: "bold" }}>Properties</div>
            {gameStore.realEstate.map((place) => (
              <div key={place}>{place}</div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
