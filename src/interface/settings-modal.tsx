import React from "react";
import { useGameStore } from "../engine/game";

export const SettingsModal: React.FC<{ closeModal: () => void }> = ({
  closeModal,
}) => {
  const [page, setPage] = React.useState<"reset" | "about">("about");

  if (page === "reset") return <ResetPage closeModal={closeModal} />;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          padding: 10,
          fontSize: 20,
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={closeModal}
      >
        X
      </div>
      <div style={{ fontSize: 20, fontWeight: "bold" }}>Donate:</div>
      <div
        style={{ fontSize: 20, textOverflow: "ellipsis", overflowX: "hidden" }}
      >
        Dogecoin address:{" "}
        <a
          href="https://blockchair.com/dogecoin/address/DRw9veHe9ModF6rjXrkqawmUT7yamDo9R7"
          target="_blank"
        >
          DRw9veHe9ModF6rjXrkqawmUT7yamDo9R7
        </a>
      </div>
      <div
        style={{
          fontSize: 20,
          textOverflow: "ellipsis",
          overflowX: "hidden",
        }}
      >
        Etherium address:{" "}
        <a
          href="https://etherscan.io/address/0xd35964190805b1210f0265847fe79b5b3afef5d6"
          target="_blank"
        >
          0xd35964190805B1210f0265847fE79b5b3AFef5D6
        </a>
      </div>
      <div style={{ fontSize: 20, fontWeight: "bold", paddingTop: 15 }}>
        About This Game
      </div>
      <div style={{ fontSize: 20 }}>
        Made by <a href="https://t3.gg">Theo</a>
      </div>
      <div style={{ fontSize: 20 }}>
        Heavily inspired by{" "}
        <a
          href="https://www.decisionproblem.com/paperclips/index2.html"
          target="_blank"
        >
          Universal Paperclips
        </a>
      </div>
      <div style={{ fontSize: 20, fontWeight: "bold", paddingTop: 15 }}>
        Technologies Used
      </div>
      <div style={{ fontSize: 20 }}>React + Typescript ❤️</div>
      <div style={{ fontSize: 20 }}>
        <a href="https://github.com/pmndrs/zustand" target="_blank">
          Zustand
        </a>{" "}
        for state management
      </div>
      <div style={{ fontSize: 20 }}>
        <a href="http://vitejs.dev/" target="_blank">
          Vite
        </a>{" "}
        for building/bundling
      </div>
      <div style={{ fontSize: 20 }}>
        <a href="https://inorganik.github.io/countUp.js/" target="_blank">
          CountUp.js
        </a>{" "}
        for decent number animations
      </div>
      <div style={{ fontSize: 20 }}>
        <a href="https://dtinth.github.io/comic-mono-font/" target="_blank">
          Comic Mono font
        </a>{" "}
        for that doge feel
      </div>
      <div style={{ fontSize: 20 }}>
        <a href="https://formidable.com/open-source/victory/" target="_blank">
          Victory
        </a>{" "}
        for charts
      </div>
      <div style={{ fontSize: 20 }}>
        <a href="https://vercel.com" target="_blank">
          Vercel
        </a>{" "}
        for hosting
      </div>
      <div style={{ fontSize: 20, fontWeight: "bold", paddingTop: 15 }}>
        Reset
      </div>
      <div>
        <button
          onClick={() => {
            setPage("reset");
          }}
        >
          Reset game
        </button>
      </div>
    </div>
  );
};

const ResetPage: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const resetToDefault = useGameStore((state) => state.resetToDefault);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
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
            resetToDefault();
            closeModal();
          }}
        >
          Yes, reset me!
        </button>
        <button onClick={() => closeModal()}>No, send me back!</button>
      </div>
    </div>
  );
};
