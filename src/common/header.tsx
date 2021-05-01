import React from "react";

export const Header: React.FC = (props) => (
  <div
    style={{
      fontWeight: "bold",
      fontStyle: "italic",
      padding: 10,
      paddingBottom: 3,
      fontSize: 20,
      borderBottom: "2px solid black",
    }}
  >
    {props.children}
  </div>
);
