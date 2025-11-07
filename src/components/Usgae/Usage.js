import React from "react";
import "./Usage.css";
import CurveGraph from "./Graph";
const Usage = () => {
  return (
    <>
    <h1 >Overall Water Usage</h1>
    <div className="usage-container">
      {["Today","Weekly","Monthly"].map((_, index) => (
        <div className="card" key={index}>
          <h3>{_} Usage</h3>
          <div className="semicircle-wrapper">
            <div className="semicircle-bg">
              <div
                className="semicircle-fill"
                style={{
                  transform: `rotate(${180 - [30, 65, 75][index]}deg)`,
                  background: ['#00c6ff', '#ff6347', '#32cd32'][index], 
                }}
              ></div>
            </div>
            <div className="center-text">
              <span>{["30L", '65L', '75L'][index]}</span>
            </div>
          </div>
          <div className="range">
          <span>Max</span>

            <span>0</span>
          </div>
        </div>
      ))}
    </div>
    <CurveGraph/></>
  );
};

export default Usage;
