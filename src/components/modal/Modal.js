import React, { useEffect } from "react";
import "./modal.scss";
import Logo from "../logo/Logo";
import { useState, useRef } from "react";
import {
  Timestamp,
  collection,
  query,
  onSnapshot,
  orderBy,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../dataBase/firebase";
import { auth } from "../../dataBase/firebase";
import { v4 as uuidv4 } from "uuid";

export default function Modal({
  currentWorkoutName,
  isShowed,
  bodyPart,
  idDoc,
}) {
  const reps = useRef(0);
  const weight = useRef(0);

  const [dataFromdb, setDataFromDB] = useState([]);

  const [display, setDisplay] = useState("none");
  const [itemId, setItemId] = useState(0);
  const [repsValue, setRepsValue] = useState("");
  const [weightsValues, setWieghtsValues] = useState("");

  const handleSubmitWithWeights = (e) => {
    e.preventDefault();
    const docID = uuidv4();

    const data = {
      workoutName: idDoc,
      date: Timestamp.fromDate(new Date()),
      weight: parseInt(weightsValues),
      reps: parseInt(repsValue),
      volume: parseInt(reps.current.value) * parseInt(reps.current.value),
      ID: docID,
    };

    setDoc(
      doc(db, "users", auth.currentUser.uid, bodyPart, idDoc, newID, docID),
      data
    );
    setWieghtsValues("");
    setRepsValue("");
  };

  const newID = new Date().getFullYear().toString();

  const handleSubmitNoWeightEx = (e) => {
    e.preventDefault();
    const docID = uuidv4();

    const data = {
      workoutName: idDoc,
      date: Timestamp.fromDate(new Date()),
      reps: parseInt(repsValue),
      volume: parseInt(repsValue),
      ID: docID,
    };

    setDoc(
      doc(db, "users", auth.currentUser.uid, bodyPart, idDoc, newID, docID),
      data
    );
    setRepsValue("");
  };

  const q = query(
    collection(db, "users", auth.currentUser.uid, bodyPart, idDoc, newID),
    orderBy("date")
  );

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
            ID: doc.data().ID,
          },
          ...prev,
        ]);
      });
    });

    return subscribe;
  }, [idDoc]);

  const handleChange = (el) => {
    setDisplay("flex");
    setRepsValue(el.reps);
    setItemId(el.ID);
  };

  const handleChangewithWeights = (el) => {
    setDisplay("flex");
    setRepsValue(el.reps);
    setItemId(el.ID);
    setWieghtsValues(el.weight);
  };

  const handleSetRepsValue = (e) => {
    setRepsValue(e.currentTarget.value);
  };

  const handleSetWeightsValue = (e) => {
    setWieghtsValues(e.currentTarget.value);
  };

  const sendChanges = async (e) => {
    e.preventDefault();

    const updatedDocRef = doc(
      db,
      "users",
      auth.currentUser.uid,
      bodyPart,
      idDoc,
      "2022",
      itemId
    );

    await updateDoc(updatedDocRef, {
      reps: repsValue,
      volume: repsValue,
    });
  };

  const sendChangeswithWeights = async (e) => {
    e.preventDefault();

    const updatedDocRef = doc(
      db,
      "users",
      auth.currentUser.uid,
      bodyPart,
      idDoc,
      "2022",
      itemId
    );

    await updateDoc(updatedDocRef, {
      reps: repsValue,
      weight: weightsValues,
      volume: repsValue * weightsValues,
    });
  };

  if (bodyPart === "Stomach" && idDoc === "Plank") {
    return (
      <>
        <div className="overlay" style={{ display: isShowed }}></div>

        <div className="modal" style={{ display: isShowed }}>
          <Logo />
          <h2 className="modal__exName">{currentWorkoutName}</h2>

          <form className="modal__form" onSubmit={handleSubmitNoWeightEx}>
            <label className="form__label">
              Seconds:
              <input
                value={repsValue}
                onChange={handleSetRepsValue}
                className="form__label-input"
                type="number"
                id="reps"
                required
                placeholder="seconds"
              />
            </label>

            <button>Add series</button>
          </form>
          <div>Workout</div>
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
                  <button onClick={() => handleChange(el)}>Change</button>
                </div>
              ))}
          </div>

          <div className="overlay" style={{ display: display }}></div>
          <div className="modal__changeForm" style={{ display: display }}>
            <div className="wrapper">
              <div>{currentWorkoutName}</div>
              <form className="modal__changeForm-form">
                <label className="modal__changeForm-form-label">
                  Reps:
                  <input
                    onChange={handleSetRepsValue}
                    value={repsValue}
                    className="form__label-input"
                    type="number"
                    id="reps"
                    ref={reps}
                    required
                    placeholder="seconds"
                  />
                </label>
                <button
                  className="modal__datastorage-btn"
                  onClick={sendChanges}
                >
                  Submit Changes
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setDisplay("none");
                  }}
                >
                  Close
                </button>
              </form>
            </div>
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
        <div className="overlay" style={{ display: isShowed }}></div>
        <div className="modal" style={{ display: isShowed }}>
          <Logo />
          <h2 className="modal__exName">{currentWorkoutName}</h2>
          <form className="modal__form" onSubmit={handleSubmitNoWeightEx}>
            <label className="form__label">
              Reps:
              <input
                onChange={handleSetRepsValue}
                className="form__label-input"
                type="number"
                id="reps"
                value={repsValue}
                required
                placeholder="reps"
              />
            </label>

            <button>Add series</button>
          </form>
          <div>Workout</div>
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
                  <button
                    className="modal__datastorage-btn"
                    onClick={() => handleChange(el)}
                  >
                    Change
                  </button>
                </div>
              ))}
          </div>
        </div>
        <div className="overlay" style={{ display: display }}></div>
        <div className="modal__changeForm" style={{ display: display }}>
          <div className="wrapper">
            <div>{currentWorkoutName}</div>
            <form className="modal__changeForm-form">
              <label>
                Reps:
                <input
                  onChange={handleSetRepsValue}
                  value={repsValue}
                  className="form__label-input"
                  type="number"
                  id="reps"
                  ref={reps}
                  required
                  placeholder="seconds"
                />
              </label>
              <button className="modal__datastorage-btn" onClick={sendChanges}>
                Submit Changes
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setDisplay("none");
                }}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="overlay" style={{ display: isShowed }}></div>
        <div className="modal" style={{ display: isShowed }}>
          <Logo />
          <h2 className="modal__exName">{currentWorkoutName}</h2>
          <form onSubmit={handleSubmitWithWeights}>
            <label className="form__label">
              Reps:
              <input
                onChange={handleSetRepsValue}
                className="form__label-input"
                type="number"
                id="reps"
                required
                placeholder="reps"
                ref={reps}
                value={repsValue}
              />
            </label>
            <label className="form__label">
              Weight:
              <input
                onChange={handleSetWeightsValue}
                value={weightsValues}
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
          <div>Workout</div>
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
                  <button
                    className="modal__datastorage-btn"
                    onClick={() => handleChangewithWeights(el)}
                  >
                    Change
                  </button>
                </div>
              ))}
          </div>
        </div>
        <div className="overlay" style={{ display: display }}></div>
        <div className="modal__changeForm" style={{ display: display }}>
          <div className="wrapper">
            <div>{currentWorkoutName}</div>
            <form className="modal__changeForm-form">
              <label>
                Reps:
                <input
                  onChange={handleSetRepsValue}
                  value={repsValue}
                  className="form__label-input"
                  type="number"
                  id="reps"
                  ref={reps}
                  required
                  placeholder="seconds"
                />
              </label>
              <label>
                Weights:
                <input
                  onChange={handleSetWeightsValue}
                  value={weightsValues}
                  className="form__label-input"
                  type="number"
                  id="weight"
                  ref={weight}
                  required
                  placeholder="weight"
                />
              </label>
              <button
                className="modal__datastorage-btn"
                onClick={sendChangeswithWeights}
              >
                Submit Changes
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setDisplay("none");
                }}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}
