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
  orderBy,
} from "firebase/firestore";
import { db } from "../../dataBase/firebase";
import { auth } from "../../dataBase/firebase";
import { uuidv4 } from "@firebase/util";

export default function Modal({ isShowed, bodyPart, idDoc }) {
  const reps = useRef(0);
  const weight = useRef(0);

  const [dataFromdb, setDataFromDB] = useState([]);

  const handleSubmitWithWeights = (e) => {
    e.preventDefault();

    addDoc(
      collection(db, "users", auth.currentUser.uid, bodyPart, idDoc, newID),
      {
        workoutName: idDoc,
        date: Timestamp.fromDate(new Date()),
        reps: parseInt(reps.current.value),
        weight: parseInt(weight.current.value),
        volume: parseInt(reps.current.value) * parseInt(weight.current.value),
      }
    );
  };
  const newID = new Date().toDateString();
  const handleSubmitNoWeightEx = (e) => {
    e.preventDefault();

    addDoc(
      collection(db, "users", auth.currentUser.uid, bodyPart, idDoc, newID),
      {
        workoutName: idDoc,
        date: Timestamp.fromDate(new Date()),
        reps: parseInt(reps.current.value),
      }
    );
  };

  const q = query(
    collection(db, "users", auth.currentUser.uid, bodyPart, idDoc, newID),
    orderBy("date")
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

  if (bodyPart === "Stomach" && idDoc === "Plank") {
    return (
      <>
        <div className="modal" style={{ display: isShowed }}>
          <Logo />

          <form onSubmit={handleSubmitNoWeightEx}>
            <label className="form__label">
              Seconds:
              <input
                className="form__label-input"
                type="number"
                id="reps"
                ref={reps}
                required
                placeholder="seconds"
              />
            </label>

            <button>Add series</button>
          </form>
          <div>Today Workout</div>
          <div className="modal__dataStorage">
            {dataFromdb &&
              dataFromdb.map((el, id) => (
                <div key={id} className="modal-div">
                  <span className="modal-span">
                    <p>Date:</p> {el.date}
                  </span>
                  <span className="modal-span">
                    <p>Seconds:</p> {el.reps}
                  </span>
                  <button>Change</button>
                </div>
              ))}
          </div>
        </div>
      </>
    );
  } else if (
    bodyPart === "Stomach" ||
    idDoc === "PushUp" ||
    idDoc === "BenchDips" ||
    idDoc === "Hyperextension" ||
    idDoc === "WideGripPullUp"
  ) {
    return (
      <>
        <div className="modal" style={{ display: isShowed }}>
          <Logo />

          <form onSubmit={handleSubmitNoWeightEx}>
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

            <button>Add series</button>
          </form>
          <div>Today Workout</div>
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
                  <button>Change</button>
                </div>
              ))}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="modal" style={{ display: isShowed }}>
          <Logo />

          <form onSubmit={handleSubmitWithWeights}>
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
          <div>Today Workout</div>
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
                    <p>Weights:</p> {el.weight} Kg
                  </span>
                  <span className="modal-span">
                    <p>Volume:</p> {el.volume} Kg
                  </span>
                  <button>Change</button>
                </div>
              ))}
          </div>
        </div>
      </>
    );
  }
}
