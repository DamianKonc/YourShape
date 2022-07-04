import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./yourResults.scss";

export default function YourResults() {
  let navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  console.log("test");
  return (
    <div className="yourResults">
      YourResults - please be patient, work on progress
      <button onClick={handleBack}>Go Back</button>
    </div>
  );
}
