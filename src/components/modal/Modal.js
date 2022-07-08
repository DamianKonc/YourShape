import React, { useEffect } from "react";
import "./modal.scss";
import Logo from "../logo/Logo";
import { useState, useRef } from "react";
import {
  doc,
  setDoc,
  Timestamp,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  collectionGroup,
} from "firebase/firestore";
import { db } from "../../dataBase/firebase";
import { auth } from "../../dataBase/firebase";
import { uuidv4 } from "@firebase/util";

export default function Modal({ isShowed, bodyPart, idDoc }) {
  const reps = useRef(0);
  const weight = useRef(0);
  const [serie, setSerie] = useState({
    date: "",
    reps: "",
    weight: "",
  });
  const [dataFromdb, setDataFromDB] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

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

  const someFunction = async () => {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setDataFromDB([]);
      const all = docSnap.data();
      console.log({ ...all });
    } else {
      console.log("No such document");
    }

    console.log(dataFromdb);
    // console.log(isShowed);
    // console.log(bodyPart);
    // console.log(idDoc);
  };
  // dataFromdb.map((el) => console.log(el.weight));

  useEffect(() => {
    someFunction();
  }, [idDoc]);

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
      <div>{dataFromdb && <div>Serie: {dataFromdb}</div>}</div>
    </div>
  );
}
