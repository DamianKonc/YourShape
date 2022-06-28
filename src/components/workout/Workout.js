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
  const SelectValue = useRef("4");

  async function getTypeEx(db) {
    const q = query(collection(db, "Type"));
    const exTypes = await getDocs(q);
    exTypes.forEach((doc) => {
      setExTypeArr((prev) => [
        ...prev,
        { Name: doc.data().Name, ID: doc.data().ID },
      ]);
    });
  }

  async function getExcercises(db) {
    const q = query(
      collection(db, "Excercises"),
      where("TypeID", "==", `${SelectValue.current}`)
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

  const showEx = (e) => {
    SelectValue.current = e.target.options[e.target.selectedIndex].dataset.id;
    console.log(SelectValue);
    e.preventDefault();
    setArr([]);
    getExcercises(db);
  };

  return (
    <>
      <Logo />
      <select onChange={showEx}>
        {exTypesArr.map((el, id) => (
          <option data-id={el.ID} key={id}>
            {el.Name}
          </option>
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
