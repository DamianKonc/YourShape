import React from "react";

import List from "../List/List";
import ListElement from "../listElement/ListElement";
import Logo from "../logo/Logo";
import { db } from "../../dataBase/firebase";
import { useState, useEffect, useRef } from "react";
import { collection, getDocs, where, query } from "firebase/firestore";

export default function Workout() {
  const [exTypesArr, setExTypeArr] = useState([]);
  const [arr, setArr] = useState([]);
  const [number, setNumber] = useState(1);

  async function getTypeEx(db) {
    const q = query(collection(db, "Type"));
    const exTypes = await getDocs(q);
    exTypes.forEach((doc) => {
      setExTypeArr((prev) => [...prev, doc.data().Name]);
    });
  }

  async function getExcercises(db) {
    const q = query(
      collection(db, "Excercises"),
      where("TypeID", "==", `${number}`)
    );
    const excercises = await getDocs(q);
    excercises.forEach((doc) => {
      setArr((prev) => [...prev, doc.data().Name]);
    });
  }

  useEffect(() => {
    getExcercises(db);
    getTypeEx(db);
  }, []);

  //REFERENCJE ZROB UseRef
  const showEx = (e) => {
    console.log(number);
    setArr([]);
    getExcercises(db);
  };

  return (
    <>
      <Logo />
      <select onChange={showEx}>
        {exTypesArr.map((el, id) => (
          <option key={id}> {el}</option>
        ))}
      </select>
      <List>
        {arr.map((el, id) => (
          <ListElement key={id}>
            <p className="chest-paragraph">{el}</p>
          </ListElement>
        ))}
      </List>
    </>
  );
}
