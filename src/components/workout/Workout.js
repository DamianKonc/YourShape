import React from "react";

import List from "../List/List";
import ListElement from "../listElement/ListElement";
import Logo from "../logo/Logo";
import Modal from "../modal/Modal";

import { useNavigate } from "react-router-dom";
import { db, storage } from "../../dataBase/firebase";
import { useState, useEffect, useRef } from "react";
import { collection, getDocs, where, query, doc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

import "./workout.scss";

export default function Workout() {
  const [exTypesArr, setExTypeArr] = useState([]);
  const [exNameArr, setexNameArr] = useState([]);
  const SelectValue = useRef("4");
  const BodyPartName = useRef("Stomach");
  const [manyPaths, setManyPaths] = useState([]);
  const [display, setDisplay] = useState("none");
  const [idDoc, setIdDoc] = useState("s");
  const [workoutName, setWorkoutName] = useState("");

  let navigate = useNavigate();

  async function getTypeEx(db) {
    const q = query(collection(db, "Type"));
    const exTypes = await getDocs(q);
    setExTypeArr([]);
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
    setexNameArr([]);
    excercises.forEach((doc) => {
      setexNameArr((prev) => [...prev, doc.data().Name]);
    });
  }

  const delay = () => new Promise((resolve) => setTimeout(resolve, 1));

  const showImgs = async (BodyPartName, el) => {
    setManyPaths([]);
    await delay();
    return getDownloadURL(
      ref(storage, `${BodyPartName.current}/${el.replaceAll(" ", "")}.jpg`)
    ).then((url) => {
      setManyPaths((prev) => [...prev, `${url} `]);
    });
  };

  async function getImages(BodyPartName) {
    const unresolvedPromises = exNameArr.map((el) =>
      showImgs(BodyPartName, el)
    );
    await Promise.all(unresolvedPromises);
  }

  const showEx = (e) => {
    SelectValue.current = e.target.options[e.target.selectedIndex].dataset.id;
    BodyPartName.current = e.target.value;
    getExcercises(db);
  };

  useEffect(() => {
    getImages(BodyPartName);
  }, [exNameArr]);

  useEffect(() => {
    getExcercises(db);
    getTypeEx(db);
  }, []);

  const handleClick = (el) => {
    setWorkoutName(el);
    setIdDoc(el.replaceAll(" ", ""));
    setDisplay("flex");
  };

  const handleClose = () => {
    setDisplay("none");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="wrapper">
      <Logo />
      <select className="workout__bodyPart-select" onChange={showEx}>
        {exTypesArr.map((el, id) => (
          <option data-id={el.ID} key={id}>
            {el.Name}
          </option>
        ))}
      </select>
      <div
        style={{ display: display }}
        onClick={handleClose}
        className="closeModal"
      >
        X
      </div>
      <Modal
        currentWorkoutName={workoutName}
        idDoc={idDoc}
        bodyPart={BodyPartName.current}
        isShowed={display}
      />
      <List>
        {exNameArr.map((el, id) => (
          <ListElement key={id}>
            {manyPaths.map((item, id) =>
              item.includes(el.replaceAll(" ", "")) ? (
                <img alt={el} key={id} className="workout-img" src={item} />
              ) : null
            )}

            <p className="chest-paragraph">{el}</p>
            <button
              className="workout__btn-add"
              onClick={() => handleClick(el)}
            >
              Add series
            </button>
          </ListElement>
        ))}
      </List>
      <button className="workout__btn-goBack" onClick={handleBack}>
        Go Back
      </button>
    </div>
  );
}
