import React from "react";

import "./chest.scss";
import List from "../List/List";
import ListElement from "../listElement/ListElement";
import Logo from "../logo/Logo";
import { db } from "../../dataBase/firebase";
import { useState, useEffect } from "react";

// import pushUps from "../../img/Klata/pompki.jpg";
// import benchpress from "../../img/Klata/sztanga-plaska.jpg";
// import inclineBenchPress from "../../img/Klata/sztanga-skos.jpg";
// import dumbbellBenchPress from "../../img/Klata/hantle-plaska.jpg";
// import dumbbellFlys from "../../img/Klata/rozpietki.jpg";
import { collection, getDocs, where, query } from "firebase/firestore";

export default function Chest() {
  const [arr, setArr] = useState([]);
  const [number, setNumber] = useState(1);

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
  console.log("a");

  useEffect(() => {
    getExcercises(db);
  }, []);

  const showEx = (e) => {
    if (e.target.value === "Chest") {
      setNumber(1);
    } else if (e.target.value === "Shoulders") {
      setNumber(2);
    }
    console.log(number);
    setArr([]);
    getExcercises(db);
  };

  // setArr((prev) => [...prev, 1]);

  return (
    <>
      <Logo />
      <select onChange={showEx}>
        <option>Chest</option>
        <option>Shoulders</option>
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

// export default function Chest() {
//   return (
//     <>
//       <div>kurczaki</div>
//     </>
//   );
// }

// export default function Chest() {
//   return (
//     <>
//       <Logo />
//       <List>
//         <ListElement>
//           <img className="chest-img" src={pushUps} />{" "}
//           <p className="chest-paragraph">Push ups</p>
//         </ListElement>
//         <ListElement>
//           <img className="chest-img" src={benchpress} />
//           <p className="chest-paragraph">Barbell Bench Press</p>
//         </ListElement>
//         <ListElement>
//           <img className="chest-img" src={inclineBenchPress} />
//           <p className="chest-paragraph">Incline Bench Press</p>
//         </ListElement>
//         <ListElement>
//           <img className="chest-img" src={dumbbellBenchPress} />
//           <p className="chest-paragraph"> Dumbbell Bench Press</p>
//         </ListElement>
//         <ListElement>
//           <img className="chest-img" src={dumbbellFlys} />
//           <p className="chest-paragraph"> Dumbbell Flys</p>
//         </ListElement>
//       </List>
//     </>
//   );
// }
