import Logo from "../logo/Logo";
import List from "../List/List";
import ListElement from "../listElement/ListElement";

import OneArmSeatedDumbbell from "../../img/triceps/WyciskanieFrancuskieJednorączSztangielkiWsiadzie.jpg";
import TwoArmSeatedDumbbellExtension from "../../img/triceps/WyciskanieFrancuskieOburaczSztangielkiWsiadzie.jpg";
import LyingDumbbellExtension from "../../img/triceps/Wyciskaniefrancuskiesztangielkilezac.jpg";
import BenchDips from "../../img/triceps/Pompk w podporzetylem.jpg";
import StraighteningTheArmWithOneHandInTheSupport from "../../img/triceps/prostowanieramieniajednoraczwklekupodpartymnalawceplaskiej.jpg";

export default function Triceps() {
  return (
    <>
      <Logo />
      <List>
        <ListElement>
          <img className="chest-img" src={OneArmSeatedDumbbell} />
          <p className="chest-paragraph">One Arm Seated Dumbbell</p>
        </ListElement>
        <ListElement>
          <img className="chest-img" src={TwoArmSeatedDumbbellExtension} />
          <p className="chest-paragraph">Two Arm Seated Dumbbell Extension</p>
        </ListElement>
        <ListElement>
          <img className="chest-img" src={LyingDumbbellExtension} />
          <p className="chest-paragraph"> Lying Dumbbell Extension</p>
        </ListElement>
        <ListElement>
          <img className="chest-img" src={BenchDips} />
          <p className="chest-paragraph">Bench Dips</p>
        </ListElement>
        <ListElement>
          <img
            className="chest-img"
            src={StraighteningTheArmWithOneHandInTheSupport}
          />
          <p className="chest-paragraph">
            Straightening The Arm With One Hand In The Support
          </p>
        </ListElement>
      </List>
    </>
  );
}
