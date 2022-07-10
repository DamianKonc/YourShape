import React, { useEffect } from "react";
import "./modal.scss";
import Logo from "../logo/Logo";
import { useState, useRef } from "react";
import {
  Timestamp,
  collection,
  query,
  where,
  addDoc,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../../dataBase/firebase";
import { auth } from "../../dataBase/firebase";

export default function Modal({ isShowed, bodyPart, idDoc }) {
  const reps = useRef(0);
  const weight = useRef(0);

  const [dataFromdb, setDataFromDB] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    addDoc(collection(db, "users", auth.currentUser.uid, bodyPart), {
      workoutName: idDoc,
      date: Timestamp.fromDate(new Date()),
      reps: parseInt(reps.current.value),
      weight: parseInt(weight.current.value),
      volume: parseInt(reps.current.value) * parseInt(weight.current.value),
    });
  };

  const q = query(
    collection(db, "users", auth.currentUser.uid, bodyPart),
    where("workoutName", "==", idDoc),
    limit(6)
  );

  // ss///

  useEffect(() => {
    const subscribe = onSnapshot(q, (querySnapshot) => {
      setDataFromDB([]);
      querySnapshot.forEach((doc) => {
        setDataFromDB((prev) => [
          {
            reps: doc.data().reps,
            weight: doc.data().weight,
            date: doc.data().date.toDate().toDateString(),
            volume: doc.data().volume,
          },
          ...prev,
        ]);
      });
    });

    return subscribe;
  }, [idDoc]);

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
      <div> Workout</div>
      <div className="modal__dataStorage">
        {dataFromdb &&
          dataFromdb.map((el, id) => (
            <div key={id} className="modal-div">
              <span className="modal-span">
                <p>Date:</p> {el.date}
              </span>
              <span className="modal-span">
                <p>Reps:</p> {el.reps}
              </span>
              <span className="modal-span">
                <p>Weights:</p> {el.weight}
              </span>
              <span className="modal-span">
                <p>Volume:</p> {el.volume}
              </span>
              <button>Change</button>
            </div>
          ))}
      </div>
    </div>
  );
}
