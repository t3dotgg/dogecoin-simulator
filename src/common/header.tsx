import React from "react";

export const Header: React.FC = (props) => (
  <div
    style={{
      fontWeight: "bold",
      fontStyle: "italic",
      padding: 10,
      paddingBottom: 3,
      fontSize: 20,
      borderBottom: "5px dotted black",
      borderRadius: "255px 15px 225px 15px/15px 225px 20px 255px",
    }}
  >
    {props.children}
  </div>
);
