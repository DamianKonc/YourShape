import React from "react";

import "./chest.scss";
import List from "../List/List";
import ListElement from "../listElement/ListElement";
import Logo from "../logo/Logo";

import pushUps from "../../img/Klata/pompki.jpg";
import benchpress from "../../img/Klata/sztanga-plaska.jpg";
import inclineBenchPress from "../../img/Klata/sztanga-skos.jpg";
import dumbbellBenchPress from "../../img/Klata/hantle-plaska.jpg";
import dumbbellFlys from "../../img/Klata/rozpietki.jpg";

export default function Chest() {
  return (
    <>
      <Logo />
      <List>
        <ListElement>
          <img className="chest-img" src={pushUps} />{" "}
          <p className="chest-paragraph">Push ups</p>
        </ListElement>
        <ListElement>
          <img className="chest-img" src={benchpress} />
          <p className="chest-paragraph">Barbell Bench Press</p>
        </ListElement>
        <ListElement>
          <img className="chest-img" src={inclineBenchPress} />
          <p className="chest-paragraph">Incline Bench Press</p>
        </ListElement>
        <ListElement>
          <img className="chest-img" src={dumbbellBenchPress} />
          <p className="chest-paragraph"> Dumbbell Bench Press</p>
        </ListElement>
        <ListElement>
          <img className="chest-img" src={dumbbellFlys} />
          <p className="chest-paragraph"> Dumbbell Flys</p>
        </ListElement>
      </List>
    </>
  );
}
