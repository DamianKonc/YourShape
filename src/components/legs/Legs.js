import React from "react";

import Logo from "../logo/Logo";
import List from "../List/List";
import ListElement from "../listElement/ListElement";

import deepSquat from "../../img/nogi/przysiady.jpg";
import lunges from "../../img/nogi/wykroki.jpg";
import dumbbellSquat from "../../img/nogi/przysiadZHantlem.jpg";
import standingBarbellCalfRaiseStandingCalfRaise from "../../img/nogi/lydki.jpg";
import frontSquat from "../../img/nogi/przysiadyZeSztangaZPrzodu.jpg";

export default function Legs() {
  return (
    <>
      <Logo />
      <List>
        <ListElement>
          <img className="chest-img" src={deepSquat} />{" "}
          <p className="chest-paragraph">Deep Squat</p>
        </ListElement>
        <ListElement>
          <img className="chest-img" src={lunges} />
          <p className="chest-paragraph">Lunges</p>
        </ListElement>
        <ListElement>
          <img className="chest-img" src={dumbbellSquat} />
          <p className="chest-paragraph">Dumbbell Squat</p>
        </ListElement>
        <ListElement>
          <img
            className="chest-img"
            src={standingBarbellCalfRaiseStandingCalfRaise}
          />
          <p className="chest-paragraph">
            {" "}
            Standing Barbell Calf Raise, Standing Calf Raise
          </p>
        </ListElement>
        <ListElement>
          <img className="chest-img" src={frontSquat} />
          <p className="chest-paragraph">Front Squat</p>
        </ListElement>
      </List>
    </>
  );
}
