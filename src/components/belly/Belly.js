import Logo from "../logo/Logo";
import List from "../List/List";
import ListElement from "../listElement/ListElement";

import plank from "../../img/brzuch/plank.jpg";
import LyingFloorLegRaise from "../../img/brzuch/UnoszenieNog.jpg";
import SitUp from "../../img/brzuch/brzuszki.jpg";
import pullingthelegstothechestinthesupport from "../../img/brzuch/przyciaganieNog.jpg";
import alternatingelbowtokneecrunch from "../../img/brzuch/naprzemiennePrzyciaganie.jpg";

export default function Belly() {
  return (
    <>
      <Logo />
      <List>
        <ListElement>
          <img className="chest-img" src={plank} />{" "}
          <p className="chest-paragraph">Plank</p>
        </ListElement>
        <ListElement>
          <img className="chest-img" src={LyingFloorLegRaise} />
          <p className="chest-paragraph">Lying Floor Leg Raise</p>
        </ListElement>
        <ListElement>
          <img className="chest-img" src={SitUp} />
          <p className="chest-paragraph"> Sit up</p>
        </ListElement>
        <ListElement>
          <img
            className="chest-img"
            src={pullingthelegstothechestinthesupport}
          />
          <p className="chest-paragraph">
            {" "}
            Pulling The Legs To The Chest In The Support
          </p>
        </ListElement>
        <ListElement>
          <img className="chest-img" src={alternatingelbowtokneecrunch} />
          <p className="chest-paragraph">Alternating elbow to knee crunch</p>
        </ListElement>
      </List>
    </>
  );
}
