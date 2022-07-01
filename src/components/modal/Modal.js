import React from "react";
import "./modal.scss";
import Logo from "../logo/Logo";
import { useState } from "react";

export default function Modal({ isShowed }) {
  return (
    <div className="modal" style={{ display: isShowed }}>
      <Logo />
      <form>
        <label className="form__label">
          Reps:
          <input
            className="form__label-input"
            type="number"
            id="reps"
            required
            placeholder="reps"
          />
        </label>
        <label className="form__label">
          Weight:
          <input
            className="form__label-input"
            type="number"
            id="weight"
            required
            placeholder="weight"
          />
          KG
        </label>
      </form>
    </div>
  );
}
