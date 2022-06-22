import React from "react";
import "./logo.scss";
import logo from "../../img/logo.jpg";

export default function Logo() {
  return (
    <>
      <header className="logo__header">
        <img className="logo__header-img" src={logo}></img>
        <h2 className="logo__header-header">
          <span className="logo__header-header-yellow">Your</span>
          <span className="logo__header-header-green"> Shape</span>
        </h2>
      </header>
    </>
  );
}
