import Logo from "../logo/Logo";
import List from "../List/List";
import ListElement from "../listElement/ListElement";

import ReverseGripBarbellCurlReverseBarbellCurls from "../../img/biceps/UginanieRamionZeSztangaNachwytem.jpg";
import OneArmDumbbellPreacherCurl from "../../img/biceps/uginanieRamieniaNaModlitewniku.jpg";
import InclineDumbbellCurl from "../../img/biceps/uginanieRamionNaLawceSkosnej.jpg";
import EZBarPreacherCurl from "../../img/biceps/uginanieRamionzeSztangaNaModlitewniku.jpg";
import StandingDumbbellCurlAlternatingDumbbellCurls from "../../img/biceps/uginanieRamionZHantelkamiStojac.jpg";

export default function Biceps() {
  return (
    <>
      <Logo />
      <List>
        <ListElement>
          <img
            className="chest-img"
            src={ReverseGripBarbellCurlReverseBarbellCurls}
          />{" "}
          <p className="chest-paragraph">
            Reverse Grip Barbell Curl, Reverse Barbell Curls
          </p>
        </ListElement>
        <ListElement>
          <img className="chest-img" src={OneArmDumbbellPreacherCurl} />
          <p className="chest-paragraph">One Arm Dumbbell Preacher Curl</p>
        </ListElement>
        <ListElement>
          <img className="chest-img" src={InclineDumbbellCurl} />
          <p className="chest-paragraph"> Incline Dumbbell Curl</p>
        </ListElement>
        <ListElement>
          <img className="chest-img" src={EZBarPreacherCurl} />
          <p className="chest-paragraph">EZ Bar Preacher Curl</p>
        </ListElement>
        <ListElement>
          <img
            className="chest-img"
            src={StandingDumbbellCurlAlternatingDumbbellCurls}
          />
          <p className="chest-paragraph">
            Standing Dumbbell Curl/Alternating Dumbbell Curls
          </p>
        </ListElement>
      </List>
    </>
  );
}
