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
  const [arr, setArr] = useState([]);
  const SelectValue = useRef("4");
  const BodyPartName = useRef("Stomach");
  const [manyPaths, setManyPaths] = useState([]);
  const [display, setDisplay] = useState("none");
  const [idDoc, setIdDoc] = useState("s");

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
    setArr([]);
    excercises.forEach((doc) => {
      setArr((prev) => [...prev, doc.data().Name]);
    });
  }

  const delay = () => new Promise((resolve) => setTimeout(resolve, 1));

  const showImgs = async (BodyPartName, el) => {
    await delay();
    return getDownloadURL(
      ref(storage, `${BodyPartName.current}/${el.replaceAll(" ", "")}.jpg`)
    ).then((url) => {
      setManyPaths([]);
      setManyPaths((prev) => [...prev, `${url} `]);
    });
  };

  async function getImages(BodyPartName) {
    const unresolvedPromises = arr.map((el) => showImgs(BodyPartName, el));
    await Promise.all(unresolvedPromises);
  }

  const showEx = (e) => {
    SelectValue.current = e.target.options[e.target.selectedIndex].dataset.id;
    BodyPartName.current = e.target.value;

    getExcercises(db);
  };

  useEffect(() => {
    getImages(BodyPartName);
  }, [arr]);

  useEffect(() => {
    getExcercises(db);
    getTypeEx(db);
    getImages(BodyPartName);
  }, []);

  const handleClick = (el) => {
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
    <>
      <Logo />
      <select onChange={showEx}>
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
      <Modal idDoc={idDoc} bodyPart={BodyPartName.current} isShowed={display} />
      <List>
        {arr.map((el, id) => (
          <ListElement key={id}>
            {manyPaths.map((item, id) =>
              item.includes(el.replaceAll(" ", "")) ? (
                <img alt={el} key={id} className="workout-img" src={item} />
              ) : (
                console.log(el.replaceAll(" ", ""))
              )
            )}
            {/* <img
              alt={el}
              className="workout-img"
              // src={manyPaths.forEach(
              //   (item) => {
              //     if (item.includes(el)) {
              //       console.log(item);
              //       return item;
              //     }
              //   }
              // )}
              {...manyPaths.forEach((item) => {
                item.includes(el.replaceAll(" ", ""))
                  ? console.log(item)
                  : console.log("nie pasuje");
              })}
            /> */}
            <p className="chest-paragraph">{el}</p>
            <button onClick={() => handleClick(el)}>Add series</button>
          </ListElement>
        ))}
      </List>
      <button onClick={handleBack}>Go Back</button>
    </>
  );
}
