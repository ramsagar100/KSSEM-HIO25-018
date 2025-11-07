import React from "react"; // Removed useEffect and useState
import "./Usage.css";
import CurveGraph from "./Graph";

const Usage = () => {
  // ✅ Set the sensor value to a constant 50
  const sensorValue = 50;
  const maxValue = 100;

  // The animation 'useEffect' hook has been removed.

  const percentage = sensorValue / maxValue;

  const usageData = [
    { label: "Today", value: 30, max: 100, unit: "L", color: "#00c6ff" },
    { label: "Weekly", value: 65, max: 100, unit: "L", color: "#ff6347" },
    { label: "Monthly", value: 75, max: 100, unit: "L", color: "#32cd32" },
  ];

  return (
    <section className="usage-statistics">
      {/* ✅ Real-time Main Gauge (Blynk-style) */}
      <div className="main-gauge">
        <h2>Live Sensor Reading</h2>
        <div className="blynk-gauge">
          <svg
            viewBox="0 0 200 100"
            xmlns="http://www.w3.org/2000/svg"
            className="gauge-svg"
          >
            {/* Background arc */}
            <path
              d="M10 90 A90 90 0 0 1 190 90"
              fill="none"
              stroke="#ddd"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Foreground arc (fills left→right) */}
            <path
              d="M10 90 A90 90 0 0 1 190 90"
              fill="none"
              stroke="#007bff"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${Math.PI * 90}`}
              strokeDashoffset={`${Math.PI * 90 * (1 - percentage)}`}
              // Removed the inline transition style, as it's not needed for a static value
            />
          </svg>
          <div className="blynk-value">
            {sensorValue}
            <span className="unit">L</span>
          </div>
          <div className="blynk-range">
            <span>0L</span>
            <span>{maxValue}L</span>
          </div>
        </div>
      </div>

      {/* 🔹 Existing Smaller Gauges */}
      <div className="usage-container">
        {usageData.map((data, index) => {
          const percentage = data.value / data.max;
          const dashLength = Math.PI * 45;
          const dashOffset = dashLength * (1 - percentage);

          return (
            <div className="card" key={index}>
              <h3>{data.label} Usage</h3>
              <svg
                viewBox="0 0 100 50"
                xmlns="http://www.w3.org/2000/svg"
                className="small-gauge"
              >
                <path
                  d="M5 45 A45 45 0 0 1 95 45"
                  fill="none"
                  stroke="#ddd"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <path
                  d="M5 45 A45 45 0 0 1 95 45"
                  fill="none"
                  stroke={data.color}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${dashLength}`}
                  strokeDashoffset={`${dashOffset}`}
                  style={{ transition: "stroke-dashoffset 0.6s ease" }}
                />
              </svg>
              <div className="center-text">{data.value}{data.unit}</div>
              <div className="range">
                <span>0{data.unit}</span>
                <span>{data.max}{data.unit}</span>
              </div>
            </div>
          );
        })}
      </div>

      <h1 className="usage-title">Overall Water Usage</h1>
      <CurveGraph title="Monthly Usage Trend (This Year vs. Last Year)" />
    </section>
  );
};

export default Usage;