import React from "react";
import { Link } from "react-router-dom";

import Logo from "../logo/Logo";
import List from "../List/List";
import ListElement from "../listElement/ListElement";
import "./workout.scss";

export default function Workout() {
  return (
    <>
      <Logo className="overwrite" />
      <List>
        <ListElement>
          <Link className="list-el-link" to={"/dashboard/workout/chest"}>
            Chest
          </Link>{" "}
        </ListElement>
        <ListElement>
          <Link className="list-el-link" to={"/dashboard/workout/back"}>
            Back
          </Link>
        </ListElement>
        <ListElement>
          <Link className="list-el-link" to={"/dashboard/workout/legs"}>
            {" "}
            Legs
          </Link>
        </ListElement>
        <ListElement>
          <Link className="list-el-link" to={"/dashboard/workout/belly"}>
            Belly
          </Link>
        </ListElement>
        <ListElement>
          <Link className="list-el-link" to={"/dashboard/workout/biceps"}>
            {" "}
            Biceps
          </Link>
        </ListElement>
        <ListElement>
          <Link className="list-el-link" to={"/dashboard/workout/triceps"}>
            {" "}
            Triceps
          </Link>
        </ListElement>
      </List>
    </>
  );
}
