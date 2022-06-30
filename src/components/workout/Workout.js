import React from "react";

import List from "../List/List";
import ListElement from "../listElement/ListElement";
import Logo from "../logo/Logo";
import { db, storage } from "../../dataBase/firebase";
import { useState, useEffect, useRef } from "react";
import { collection, getDocs, where, query } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

import "./workout.scss";

export default function Workout() {
  const [exTypesArr, setExTypeArr] = useState([]);
  const [arr, setArr] = useState([]);
  const SelectValue = useRef("4");
  const BodyPartName = useRef("Stomach");
  const [manyPaths, setManyPaths] = useState([]);

  console.log("test");

  // getImages(BodyPartName);

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

  async function getImages(BodyPartName) {
    arr.map(async (el) =>
      getDownloadURL(ref(storage, `${BodyPartName.current}/${el}.jpg`)).then(
        (url) => {
          setManyPaths((prev) => [...prev, `${url} `]);
        }
      )
    );
  }

  const showEx = (e) => {
    SelectValue.current = e.target.options[e.target.selectedIndex].dataset.id;
    BodyPartName.current = e.target.value;
    setArr([]);
    getExcercises(db);
  };

  useEffect(() => {
    getExcercises(db);
    getTypeEx(db);
  }, []);

  useEffect(() => {
    getImages(BodyPartName);
    console.log(arr);
  }, [arr]);

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
            <img alt={el} className="workout-img" src={manyPaths[id]} />
            <p className="chest-paragraph">{el}</p>
          </ListElement>
        ))}
      </List>
    </>
  );
}
