import React, { useEffect } from "react";
import "./modal.scss";
import Logo from "../logo/Logo";
import { useState, useRef } from "react";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../../dataBase/firebase";
import { auth } from "../../dataBase/firebase";
import { uuidv4 } from "@firebase/util";

export default function Modal({ isShowed, bodyPart, idDoc }) {
  const reps = useRef(0);
  const weight = useRef(0);
  const [serie, setSerie] = useState({
    date: "1",
    reps: "1",
    weight: "1",
  });
  const [newId, setNewId] = useState(0);
  const [dataFromdb, setDataFromDB] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    setNewId(2);
    setSerie(() => ({
      date: Timestamp.fromDate(new Date()),
      reps: parseInt(reps.current.value),
      weight: parseInt(weight.current.value),
    }));
  };
  const docRef = doc(db, "users", auth.currentUser.uid, bodyPart, idDoc);

  const id = uuidv4();
  const sendInfos = (id) => {
    setDoc(
      docRef,
      { [id]: serie },
      {
        merge: true,
      }
    );
  };

  useEffect(() => {
    sendInfos(id);
  }, [serie]);

  return (
    <div className="modal" style={{ display: isShowed }}>
      <Logo />
      <form onSubmit={handleSubmit}>
        <label className="form__label">
          Reps:
          <input
            className="form__label-input"
            type="number"
            id="reps"
            ref={reps}
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
            ref={weight}
            required
            placeholder="weight"
          />
          KG
        </label>
        <button>Add series</button>
      </form>
      <div>{dataFromdb && <div>Serie: {dataFromdb[1]}</div>}</div>
    </div>
  );
}
