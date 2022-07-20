import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, query, getDocs, where } from "firebase/firestore";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useRef } from "react";
import { db, auth } from "../../dataBase/firebase";
import Logo from "../logo/Logo";
import "./yourResults.scss";
import _ from "lodash";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function YourResults() {
  let navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const [exTypesArr, setExTypeArr] = useState([]);
  const [exNameArr, setexNameArr] = useState([]);
  const SelectValue = useRef("4");
  const BodyPartName = useRef("Stomach");
  const [exName, setExName] = useState("Alternatingelbowtokneecrunch");
  const [exNameWithSpaces, setexNameWithSpaces] = useState(
    "Alternating elbow to knee crunch"
  );
  const [wourkoutData, setWorkoutData] = useState([]);

  useEffect(() => {
    if (exNameArr.length) {
      setExName(exNameArr[0].replaceAll(" ", ""));
    }
  }, [exNameArr]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Your results with ${exNameWithSpaces}`,
        color: "black",
      },
    },
  };

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

  const exNameToDownload = (e) => {
    setExName(() => e.target.value.replaceAll(" ", ""));
    setexNameWithSpaces(() => e.target.value);
  };

  const showEx = (e) => {
    SelectValue.current = e.target.options[e.target.selectedIndex].dataset.id;
    BodyPartName.current = e.target.value;
    getExcercises(db);
  };

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

  useEffect(() => {
    getExcercises(db);
    getTypeEx(db);
  }, []);

  const workoutsYear = new Date().getFullYear().toString();
  const docRef = collection(
    db,
    "users",
    auth.currentUser.uid,
    BodyPartName.current,
    exName,
    workoutsYear
  );

  const getStats = async (docRef) => {
    setWorkoutData([]);
    const dockSnapshot = await getDocs(docRef);
    dockSnapshot.forEach((doc) => {
      const day = doc.data().date.toDate().getDate().toString();
      const month = doc.data().date.toDate().getMonth();
      const year = doc.data().date.toDate().getFullYear();
      setWorkoutData((prev) => [
        ...prev,
        {
          data: day + " " + month + " " + year,
          workoutName: doc.data().workoutName,
          reps: doc.data().reps,
          volume: doc.data().volume,
          groupNumber: parseInt(day + month + year),
        },
      ]);
    });
  };

  const workoutarr = _.groupBy(wourkoutData, ({ groupNumber }) => groupNumber);

  const objOfRepsSumm = {};
  const dateOfWorkout = {};
  let sum = [];
  const labels = [];

  for (const key in workoutarr) {
    objOfRepsSumm[key] = workoutarr[key]
      .map((el) => el.volume)
      .reduce((el1, el2) => el1 + el2);
  }

  for (const key in workoutarr) {
    dateOfWorkout[key] = workoutarr[key]
      .map((el) => el.data)
      .filter((item, index, array) => array.indexOf(item) === index);
  }

  for (const property in dateOfWorkout) {
    labels.push(dateOfWorkout[property][0]);
  }
  for (const property in objOfRepsSumm) {
    sum.push(objOfRepsSumm[property]);
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Your progres",
        data: sum,
        borderColor: "black",
        backgroundColor: "black",
      },
    ],
  };

  return (
    <div className="wrapper">
      <Logo />
      <div className="yourResults">
        <div>
          <div className="yourResults__select">
            <select className="yourResults__select-el" onChange={showEx}>
              {exTypesArr.map((el) => (
                <option data-id={el.ID} key={el.ID}>
                  {el.Name}
                </option>
              ))}
            </select>
            <select
              className="yourResults__select-el"
              onChange={exNameToDownload}
            >
              {exNameArr.map((el, id) => (
                <option key={id}>{el}</option>
              ))}
            </select>
            <button
              className="yourResults__select-btn"
              onClick={() => getStats(docRef)}
            >
              Check data
            </button>
          </div>

          <div className="yourresults__chart">
            <Line options={options} data={data} />
          </div>
        </div>
        <button className="yourresult__goback" onClick={handleBack}>
          Go Back
        </button>
      </div>
    </div>
  );
}
