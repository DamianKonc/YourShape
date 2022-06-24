import React from "react";
import "./listElement.scss";

export default function ListElement({ children }) {
  return <li className="list-el">{children}</li>;
}
