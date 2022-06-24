import React from "react";

import Logo from "../logo/Logo";
import List from "../List/List";
import ListElement from "../listElement/ListElement";

import wideGripPullUp from "../../img/plecy/podciaganie.jpg";
import bentOverRow from "../../img/plecy/wioslowanie.jpg";
import hyperextension from "../../img/plecy/opady.jpg";
import oneArmDumbbellRow from "../../img/plecy/sciaganie-hantla.jpg";
import SidewaysLiftingOfDumbbellsInTheFallOfTheTorso from "../../img/plecy/unoszeniehantliwopadzietulowia.jpg";

export default function Back() {
  return (
    <>
      <Logo />
      <List>
        <ListElement>
          <img className="chest-img" src={wideGripPullUp} />{" "}
          <p className="chest-paragraph">Wide Grip Pull Up</p>
        </ListElement>
        <ListElement>
          <img className="chest-img" src={bentOverRow} />
          <p className="chest-paragraph">Bent Over Row</p>
        </ListElement>
        <ListElement>
          <img className="chest-img" src={hyperextension} />
          <p className="chest-paragraph">Hyperextension</p>
        </ListElement>
        <ListElement>
          <img className="chest-img" src={oneArmDumbbellRow} />
          <p className="chest-paragraph"> One Arm Dumbbell Row</p>
        </ListElement>
        <ListElement>
          <img
            className="chest-img"
            src={SidewaysLiftingOfDumbbellsInTheFallOfTheTorso}
          />
          <p className="chest-paragraph">
            Sideways Lifting Of Dumbbells In The Fall Of The Torso
          </p>
        </ListElement>
      </List>
    </>
  );
}
